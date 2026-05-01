import mongoose from 'mongoose';
import 'dotenv/config';
import { Verification } from '../models/Verification.js';
import { ScamReport } from '../models/ScamReport.js';
import { Company } from '../models/Company.js';

const verifiedCompanies = [
  { name: 'Google India',              website: 'https://google.co.in',    year: '1998', hq: 'Hyderabad',  score: 99 },
  { name: 'Microsoft Hyderabad',       website: 'https://microsoft.com',   year: '1975', hq: 'Hyderabad',  score: 98 },
  { name: 'Tata Consultancy Services', website: 'https://tcs.com',         year: '1968', hq: 'Mumbai',     score: 95 },
  { name: 'Infosys Limited',           website: 'https://infosys.com',     year: '1981', hq: 'Bengaluru',  score: 93 },
  { name: 'Amazon Web Services',       website: 'https://aws.amazon.com',  year: '2006', hq: 'Seattle',    score: 97 },
  { name: 'Wipro Technologies',        website: 'https://wipro.com',       year: '1945', hq: 'Bengaluru',  score: 90 },
  { name: 'Zomato',                    website: 'https://zomato.com',      year: '2008', hq: 'Gurugram',   score: 88 },
  { name: 'Flipkart',                  website: 'https://flipkart.com',    year: '2007', hq: 'Bengaluru',  score: 89 },
  { name: 'Adobe India',               website: 'https://adobe.com',       year: '1982', hq: 'Noida',      score: 95 },
  { name: 'Intel Corporation',         website: 'https://intel.com',       year: '1968', hq: 'Bengaluru',  score: 96 },
];

const seedData = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error('MONGODB_URI is missing'); process.exit(1); }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    // Clear all collections for a clean slate
    await Promise.all([
      Verification.deleteMany({}),
      ScamReport.deleteMany({}),
      Company.deleteMany({}),
    ]);

    // Seed Verification history
    const verifications = verifiedCompanies.map(c => ({
      userId: 'system-seed',
      companyName: c.name,
      riskScore: 100 - c.score,
    }));
    await Verification.insertMany(verifications);

    // Seed Company profiles (instantly searchable, no Exa call needed)
    const companyProfiles = verifiedCompanies.map(c => ({
      companyName:     c.name,
      officialWebsite: c.website,
      yearEstablished: c.year,
      headquarters:    c.hq,
      trustScore:      c.score,
      redFlagSummary:  null,
      source:          'seed',
      freshlyVerified: false,
      exaSearchedAt:   null,
    }));
    await Company.insertMany(companyProfiles);

    // Seed sample scam reports
    const mockScams = [
      {
        companyName:   'Global Tech Solutions (Fake)',
        reportDetails: 'Asked for ₹5,000 registration fee. Offer came from @gmail.com. No CIN provided.',
        userId: 'user-seed-1'
      },
      {
        companyName:   'Reliance Careers (Impersonator)',
        reportDetails: 'Telegram-only interview. Used domain @reliance-jobs-india.org — not official.',
        userId: 'user-seed-2'
      },
    ];
    await ScamReport.insertMany(mockScams);

    console.log(`✅ Seeded ${verifiedCompanies.length} company profiles`);
    console.log(`✅ Seeded ${verifications.length} verification records`);
    console.log(`✅ Seeded ${mockScams.length} scam reports`);
    console.log('🌱 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
