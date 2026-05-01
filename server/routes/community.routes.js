import { Router } from 'express';
import { submitReport, getCompanyData } from '../controllers/community.controller.js';

const router = Router();

router.post('/reports', submitReport);
router.get('/companies/:name', getCompanyData);

export default router;
