import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';

import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import verifyRoutes from './routes/verify.routes.js';
import communityRoutes from './routes/community.routes.js';

// Rate limiter for /verify route
const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { error: 'Too many verification requests, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  // Connect to MongoDB
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/status', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
      status: 'alive',
      database: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/stats', async (req, res) => {
    try {
      const { Verification } = await import('./models/Verification.js');
      const { ScamReport } = await import('./models/ScamReport.js');
      
      const [verificationsCount, scamsCount] = await Promise.all([
        Verification.countDocuments(),
        ScamReport.countDocuments()
      ]);
      
      res.json({
        verifications: verificationsCount,
        reports: scamsCount,
        moneySaved: Math.floor(verificationsCount * 12500)
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // One-time seed endpoint — protected by SEED_SECRET env var
  // Hit GET /api/seed?secret=YOUR_SEED_SECRET to populate the Company collection on Render
  app.get('/api/seed', async (req, res) => {
    const secret = process.env.SEED_SECRET;
    if (!secret || req.query.secret !== secret) {
      return res.status(401).json({ error: 'Unauthorized. Set SEED_SECRET env var and pass ?secret=... in the URL.' });
    }
    try {
      const { Verification } = await import('./models/Verification.js');
      const { ScamReport }   = await import('./models/ScamReport.js');
      const { Company }      = await import('./models/Company.js');

      const companies = [
        { name: 'Google India',              website: 'https://google.co.in',    year: '1998', hq: 'Hyderabad',  score: 99 },
        { name: 'Microsoft India',           website: 'https://microsoft.com',   year: '1975', hq: 'Hyderabad',  score: 98 },
        { name: 'Tata Consultancy Services', website: 'https://tcs.com',         year: '1968', hq: 'Mumbai',     score: 95 },
        { name: 'Infosys Limited',           website: 'https://infosys.com',     year: '1981', hq: 'Bengaluru',  score: 93 },
        { name: 'Amazon Web Services',       website: 'https://aws.amazon.com',  year: '2006', hq: 'Seattle',    score: 97 },
        { name: 'Wipro Technologies',        website: 'https://wipro.com',       year: '1945', hq: 'Bengaluru',  score: 90 },
        { name: 'Zomato',                    website: 'https://zomato.com',      year: '2008', hq: 'Gurugram',   score: 88 },
        { name: 'Flipkart',                  website: 'https://flipkart.com',    year: '2007', hq: 'Bengaluru',  score: 89 },
        { name: 'Adobe India',               website: 'https://adobe.com',       year: '1982', hq: 'Noida',      score: 95 },
        { name: 'Intel Corporation',         website: 'https://intel.com',       year: '1968', hq: 'Bengaluru',  score: 96 },
      ];

      // Upsert company profiles (safe to run multiple times)
      let upserted = 0;
      for (const c of companies) {
        await Company.findOneAndUpdate(
          { companyName: c.name },
          {
            companyName:     c.name,
            officialWebsite: c.website,
            yearEstablished: c.year,
            headquarters:    c.hq,
            trustScore:      c.score,
            redFlagSummary:  null,
            source:          'seed',
            freshlyVerified: false,
          },
          { upsert: true, new: true }
        );
        upserted++;
      }

      const [companyCount, verifCount, reportCount] = await Promise.all([
        Company.countDocuments(),
        Verification.countDocuments(),
        ScamReport.countDocuments(),
      ]);

      res.json({
        message: `✅ Seeded ${upserted} company profiles`,
        totals: { companies: companyCount, verifications: verifCount, reports: reportCount },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  
  app.use('/api/verify-offer', verifyLimiter); // Apply rate limit to verify route
  app.use('/api', verifyRoutes);
  app.use('/api', communityRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Fallback for SPA routing in production
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
