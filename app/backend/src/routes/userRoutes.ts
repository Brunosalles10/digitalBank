import express from "express";
import {
  createUser,
  deleteUserById,
  getAll,
  getUserById,
  updateUser,
} from "../controllers/userController";

const router = express.Router();
//routes for user
router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUserById);

export default router;
