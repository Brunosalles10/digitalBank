import express from "express";
import { pay } from "../controllers/paymentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Route to pay
router.post("/payment", authMiddleware, pay);

export default router;
