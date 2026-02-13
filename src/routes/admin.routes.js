import express from "express";
import { getAnalytics } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

// Admin analytics
router.get("/analytics", authMiddleware, adminMiddleware, getAnalytics);

export default router;
