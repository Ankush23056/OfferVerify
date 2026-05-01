import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import mongoose from 'mongoose';

import verifyRoutes from './routes/verify.routes.js';
import communityRoutes from './routes/community.routes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Connect to MongoDB if URI is provided
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
    }
  } else {
    console.warn('MONGODB_URI is not set. Community features requiring database will not work.');
  }

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/debug-key', (req, res) => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      res.json({ exists: false, length: 0 });
    } else {
      res.json({ exists: true, length: key.length, preview: key.substring(0, 4) + '...' });
    }
  });
  
  app.use('/api', verifyRoutes);
  app.use('/api', communityRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
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
