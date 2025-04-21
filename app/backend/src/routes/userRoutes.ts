import express from "express";
import {
  createUser,
  deleteUserById,
  getAll,
  getUserById,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
//routes public
router.post("/users", createUser);

//routes private
router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUserById);

export default router;
