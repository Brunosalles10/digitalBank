import express from "express";
import { depositFunds } from "../controllers/depositController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Route to deposit
router.post("/deposit", authMiddleware, depositFunds);

export default router;
