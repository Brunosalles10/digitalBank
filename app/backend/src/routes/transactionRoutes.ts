import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  transferFunds,
  updateTransaction,
} from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
//routes private
router.get("/transactions", authMiddleware, getAllTransactions);
router.get("/transactions/:id", authMiddleware, getTransactionById);
router.get(
  "/transactions/user/:userId",
  authMiddleware,
  getTransactionsByUserId
);

router.post("/transactions", authMiddleware, createTransaction);
router.put("/transactions/:id", authMiddleware, updateTransaction);
router.delete("/transactions/:id", authMiddleware, deleteTransaction);
router.post("/transactions/transfer", authMiddleware, transferFunds);

export default router;
