// routes/userRoutes.js

import express from "express";
import {
    changePassword,
    deleteMe,
    getRole,
    updateProfile,
} from "../Controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/me", protect, deleteMe);
router.get("/role", protect, getRole);


export default router;
