import { Router } from 'express';
import multer from 'multer';
import { verifyOffer } from '../controllers/verify.controller.js';

const router = Router();

// Store file in memory for processing
const upload = multer({ storage: multer.memoryStorage() });

router.post('/verify-offer', upload.single('file'), verifyOffer);

export default router;
