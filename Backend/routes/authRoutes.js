// routes/authRoutes.js

import express from "express";
import {
    getProfile,
    googleAuth,
    googleCallback,
    login,
    logout,
    signup,
} from "../Controller/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

export default router;
