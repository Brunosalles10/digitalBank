import { Request, Response } from "express";
import AccountModel from "../models/AccountModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const accounts = await AccountModel.findAll();
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAccountById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const account = await AccountModel.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { userId, accountNumber, balance, type } = req.body;
    // Validate required fields
    if (!userId || !balance || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Validate account number format
    if (accountNumber) {
      const existingAccount = await AccountModel.findOne({
        where: { accountNumber },
      });
      if (existingAccount) {
        return res.status(400).json({ error: "Account number already exists" });
      }
    }
    const account = await AccountModel.create({
      userId,
      accountNumber,
      balance,
      type,
    });
    return res.status(201).json(account);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAccount = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { userId, accountNumber, balance, type } = req.body;

    const account = await AccountModel.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Validate required fields
    if (accountNumber && accountNumber !== account.accountNumber) {
      return res
        .status(400)
        .json({ error: "Account number cannot be updated" });
    }

    await account.update({ userId, balance, type });
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAccount = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const account = await AccountModel.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    await account.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAccountByUserId = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const accounts = await AccountModel.findAll({
      where: { userId: req.params.userId },
    });
    if (accounts.length === 0) {
      return res.status(404).json({ error: "No accounts found for this user" });
    }
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getAccountByAccountNumber = async (
  req: Request<{ accountNumber: string }>,
  res: Response
) => {
  try {
    const account = await AccountModel.findOne({
      where: { accountNumber: req.params.accountNumber },
    });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
