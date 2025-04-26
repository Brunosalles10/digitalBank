import express from "express";
import {
  createAccount,
  deleteAccount,
  getAccountByAccountNumber,
  getAccountById,
  getAccountByUserId,
  getAll,
  updateAccount,
} from "../controllers/accountsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

//routes private
router.get("/accounts", authMiddleware, getAll);
router.get("/accounts/:id", authMiddleware, getAccountById);
router.post("/accounts", authMiddleware, createAccount);
router.put("/accounts/:id", authMiddleware, updateAccount);
router.delete("/accounts/:id", authMiddleware, deleteAccount);
router.get("/accounts/user/:userId", authMiddleware, getAccountByUserId);
router.get(
  "/accounts/account/:accountNumber",
  authMiddleware,
  getAccountByAccountNumber
);

export default router;
