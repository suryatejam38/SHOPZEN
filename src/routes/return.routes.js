import express from "express";
import {
  requestReturn,
  getAllReturns,
  completeReturn
} from "../controllers/return.controller.js";

import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

// Customer
router.post("/", authMiddleware, requestReturn);

// Admin
router.get("/", authMiddleware, adminMiddleware, getAllReturns);
router.put("/:id", authMiddleware, adminMiddleware, completeReturn);

export default router;
