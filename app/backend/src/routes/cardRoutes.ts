import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";

import {
  createCard,
  deleteCard,
  getAll,
  getCardById,
  getCardsByAccountNumber,
  updateCard,
} from "../controllers/cardController";

const router = express.Router();

router.get("/cards", authMiddleware, getAll);
router.get("/cards/:id", authMiddleware, getCardById);
router.post("/cards", authMiddleware, createCard);
router.put("/cards/:id", authMiddleware, updateCard);
router.delete("/cards/:id", authMiddleware, deleteCard);
router.get(
  "/cards/account/:accountNumber",
  authMiddleware,
  getCardsByAccountNumber
);

export default router;
