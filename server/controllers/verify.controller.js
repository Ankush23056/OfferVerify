import { analyzeOfferWithAI } from '../services/verify.service.js';
import { Verification } from '../models/Verification.js';
import mongoose from 'mongoose';

export const verifyOffer = async (req, res) => {
  try {
    const file = req.file;
    const textContent = req.body.text;

    if (!file && !textContent) {
      res.status(400).json({ error: 'No file uploaded or text provided' });
      return;
    }

    let result;
    if (file) {
      const { buffer, mimetype } = file;
      result = await analyzeOfferWithAI(buffer, mimetype);
    } else {
      result = await analyzeOfferWithAI(null, 'text/plain', textContent);
    }

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
    res.status(500).json({ error: 'An unexpected error occurred during verification. Please try again later.' });
  }
};
