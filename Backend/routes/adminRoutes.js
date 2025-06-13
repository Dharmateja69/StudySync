// routes/adminRoutes.js
import express from "express";
import { approveFile, getallfiles, getAllUsers, getapprovedFiles, getPendingFiles, getrejectedFiles, rejectFile } from "../Controller/AdminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/IsAdmin.js";


const router = express.Router();

router.get("/files/pending", protect, isAdmin, getPendingFiles);
router.get("/files/approved", protect, isAdmin, getapprovedFiles);
router.get("/files/rejected", protect, isAdmin, getrejectedFiles);
// routes/adminRoutes.js
router.post("/files/:id/approve", protect, isAdmin, approveFile);
// routes/adminRoutes.js
router.post("/files/:id/reject", protect, isAdmin, rejectFile);
// routes/adminRoutes.js
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/all", protect, isAdmin, getallfiles);


export default router;
