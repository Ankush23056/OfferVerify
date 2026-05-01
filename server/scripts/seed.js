import mongoose from 'mongoose';
import 'dotenv/config';
import { Verification } from '../models/Verification.js';
import { ScamReport } from '../models/ScamReport.js';

const seedData = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is missing');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data (optional, but good for a clean seed)
    await Verification.deleteMany({});
    await ScamReport.deleteMany({});

    const companies = [
      { name: 'Google India', score: 95 },
      { name: 'Microsoft Hyderabad', score: 98 },
      { name: 'Tata Consultancy Services', score: 92 },
      { name: 'Infosys Limited', score: 90 },
      { name: 'Amazon Web Services', score: 96 },
      { name: 'Wipro Technologies', score: 88 },
      { name: 'Zomato', score: 85 },
      { name: 'Flipkart', score: 87 },
      { name: 'Adobe India', score: 94 },
      { name: 'Intel Corporation', score: 93 }
    ];

    const verifications = companies.map(c => ({
      userId: 'system-seed',
      companyName: c.name,
      riskScore: 100 - c.score // Convert trust score to risk score (100 - trust)
    }));

    await Verification.insertMany(verifications);
    console.log(`Successfully seeded ${verifications.length} verified companies.`);

    // Add a few mock scam reports for variety
    const mockScams = [
      { 
        companyName: 'Global Tech Solutions (Fake)', 
        reportDetails: 'Asked for 5000 for laptop security deposit. Sent offer from @gmail.com.',
        userId: 'user-123'
      },
      { 
        companyName: 'Reliance Careers (Impersonator)', 
        reportDetails: 'Telegram interview only. No video call. Suspicious domain: @reliance-jobs-india.org',
        userId: 'user-456'
      }
    ];

    await ScamReport.insertMany(mockScams);
    console.log(`Successfully seeded ${mockScams.length} scam reports.`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
