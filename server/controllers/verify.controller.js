import { analyzeOfferWithAI } from '../services/verify.service.js';
import { Verification } from '../models/Verification.js';
import mongoose from 'mongoose';

export const verifyOffer = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const { buffer, mimetype } = file;

    // Send file buffer to service for AI analysis
    const result = await analyzeOfferWithAI(buffer, mimetype);

    // If connected to mongo, save verification
    if (mongoose.connection.readyState === 1 && result.companyName) {
      try {
        await Verification.create({
          userId: 'anonymous', // could extract from request if we had auth
          companyName: result.companyName,
          riskScore: result.riskScore
        });
      } catch (dbErr) {
        console.error('Error saving verification to DB:', dbErr);
        // non-blocking
      }
    }

    res.json(result);
  } catch (error) {
    console.error('Error in verifyOffer:', error);
    res.status(500).json({ error: error.message || 'Failed to verify offer' });
  }
};
