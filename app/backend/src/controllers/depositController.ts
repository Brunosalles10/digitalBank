import { Request, Response } from "express";
import DepositService from "../services/deposit.service";

const depositService = new DepositService();

export const depositFunds = async (req: Request, res: Response) => {
  const { accountNumber, amount, description } = req.body;

  try {
    const result = await depositService.depositFunds(
      accountNumber,
      parseFloat(amount),
      description
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
