import express from "express";
import { getWallet } from "../controllers/wallet.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Customer wallet
router.get("/", authMiddleware, getWallet);

export default router;
