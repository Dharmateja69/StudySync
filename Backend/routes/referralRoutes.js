import { Router } from 'express';
import { generateReferralLink, getReferralStats, useReferralCode } from '../Controller/ReferalController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = Router();

// TODO: Auth routes will go here
router.get("/generate", protect, generateReferralLink);
router.get("/me", protect, getReferralStats);
router.post("/use", protect, useReferralCode);


export default router;
