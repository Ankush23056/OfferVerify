import { ScamReport } from '../models/ScamReport.js';
import { Verification } from '../models/Verification.js';

/**
 * Connect the frontend "Report" button to a POST /api/reports endpoint
 * that saves to MongoDB.
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
 * Global Scam Search: Query reports and verifications by company name.
 */
export const getCompanyData = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: 'Company name is required.' });
    }

    // Search for reports matching the company name
    const reports = await ScamReport.find({ 
      companyName: { $regex: new RegExp(name, 'i') } 
    }).sort({ reportedAt: -1 });
    
    // Check verifications for this company
    const verifications = await Verification.find({ 
      companyName: { $regex: new RegExp(name, 'i') } 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      reports: reports || [],
      verifications: verifications || [],
      companyName: name
    });
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).json({ error: 'Failed to fetch company data.' });
  }
};
