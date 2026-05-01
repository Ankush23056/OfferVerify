import { Router } from 'express';
import multer from 'multer';
import { verifyOffer } from '../controllers/verify.controller.js';

const router = Router();

// Store file in memory for processing
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Images are allowed.'));
    }
  }
});

router.post('/verify-offer', upload.single('file'), verifyOffer);

export default router;
