import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);
  return res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf, phone } = req.body;
    // Validate required fields

    if (!name || !email || !password || !cpf || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const existingCpf = await UserModel.findOne({ where: { cpf } });
    if (existingCpf) {
      return res.status(400).json({ error: "CPF already exists" });
    }
    const existingPhone = await UserModel.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ error: "Phone already exists" });
    }

    const user = await UserModel.create({ name, email, password, cpf, phone });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  try {
    const { name, password, cpf, phone, email } = req.body;

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate required fields
    if (email && email !== user.email) {
      return res.status(400).json({ error: "Email cannot be updated" });
    }

    if (cpf && cpf !== user.cpf) {
      const existingCpf = await UserModel.findOne({ where: { cpf } });
      if (existingCpf) {
        return res.status(400).json({ error: "CPF already exists" });
      }
      user.cpf = cpf;
    }

    if (phone && phone !== user.phone) {
      const existingPhone = await UserModel.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ error: "Phone already exists" });
      }
      user.phone = phone;
    }

    // Update user and password
    if (name) user.name = name;
    if (password) user.password = password;
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
