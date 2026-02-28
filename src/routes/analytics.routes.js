import express from "express";
import { getDashboardStats } from "../controllers/analytics.controller.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

// Admin dashboard stats
router.get("/", authMiddleware, adminMiddleware, getDashboardStats);

export default router;