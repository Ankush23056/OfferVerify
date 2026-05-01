import { Company } from '../models/Company.js';
import { Verification } from '../models/Verification.js';

export const submitReport = async (req, res) => {
  try {
    const { companyName, reportDetails, userId } = req.body;

    if (!companyName || !reportDetails) {
      return res.status(400).json({ error: 'Company name and report details are required.' });
    }

    // Upsert company
    let company = await Company.findOne({ name: { $regex: new RegExp(`^${companyName}$`, 'i') } });
    
    if (!company) {
      company = new Company({ name: companyName, scamReports: [] });
    }

    company.scamReports.push({
      userId: userId || 'anonymous',
      reportDetails,
      reportedAt: new Date(),
    });

    await company.save();

    res.status(201).json({ message: 'Report submitted successfully.', company });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'Failed to submit report.' });
  }
};

export const getCompanyData = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: 'Company name is required.' });
    }

    const company = await Company.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    
    // Check verifications for this company
    const verifications = await Verification.find({ companyName: { $regex: new RegExp(`^${name}$`, 'i') } });

    res.status(200).json({
      company: company || null,
      verifications: verifications || [],
    });
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).json({ error: 'Failed to fetch company data.' });
  }
};
