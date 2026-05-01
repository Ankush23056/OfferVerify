import { ScamReport } from '../models/ScamReport.js';
import { Verification } from '../models/Verification.js';
import { Company } from '../models/Company.js';
import { ragSearchCompany } from '../services/exa.service.js';

/**
 * POST /api/reports
 * Submit a community scam report.
 */
export const submitReport = async (req, res) => {
  try {
    const { companyName, reportDetails, userId } = req.body;

    if (!companyName || !reportDetails) {
      return res.status(400).json({ error: 'Company name and report details are required.' });
    }

    const report = new ScamReport({
      companyName,
      reportDetails,
      userId: userId || 'anonymous'
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully.', report });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'Failed to submit report.' });
  }
};

/**
 * GET /api/companies/:name
 * Primary search endpoint with RAG fallback.
 *
 * Flow:
 *  1. Check Company profile cache in MongoDB
 *  2. Check Verification + ScamReport history
 *  3. If Company cache is missing AND no history → trigger Exa RAG pipeline
 *  4. Save new Company profile to MongoDB for future instant lookups
 *  5. Return combined data to frontend
 */
export const getCompanyData = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) return res.status(400).json({ error: 'Company name is required.' });

    // Run all DB queries in parallel
    const [reports, verifications, cachedProfile] = await Promise.all([
      ScamReport.find({ companyName: { $regex: new RegExp(name, 'i') } }).sort({ reportedAt: -1 }),
      Verification.find({ companyName: { $regex: new RegExp(name, 'i') } }).sort({ createdAt: -1 }),
      Company.findOne({ companyName: { $regex: new RegExp(name, 'i') } }),
    ]);

    let companyProfile = cachedProfile;
    let freshlyVerified = false;

    // --- RAG Trigger: No cached profile AND no community history ---
    if (!cachedProfile && process.env.EXA_API_KEY) {
      try {
        console.log(`[RAG] No cache found for "${name}". Triggering Exa search...`);
        const ragData = await ragSearchCompany(name);

        if (ragData) {
          // Save to MongoDB for instant future lookups
          companyProfile = await Company.create({
            companyName: ragData.companyName,
            officialWebsite: ragData.officialWebsite,
            yearEstablished: ragData.yearEstablished,
            headquarters: ragData.headquarters,
            trustScore: ragData.trustScore,
            redFlagSummary: ragData.redFlagSummary,
            source: 'exa-rag',
            freshlyVerified: true,
            exaSearchedAt: new Date(),
          });
          freshlyVerified = true;
          console.log(`[RAG] Profile saved for "${ragData.companyName}" (trustScore: ${ragData.trustScore})`);
        }
      } catch (ragErr) {
        // Non-fatal: RAG failure should not break the search response
        console.error('[RAG] Pipeline error:', ragErr.message);
      }
    }

    res.status(200).json({
      companyName: name,
      reports: reports || [],
      verifications: verifications || [],
      companyProfile: companyProfile || null,
      freshlyVerified,
    });
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).json({ error: 'Failed to fetch company data.' });
  }
};
