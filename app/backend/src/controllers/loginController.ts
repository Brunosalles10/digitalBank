import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    // Returns a JWT token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
