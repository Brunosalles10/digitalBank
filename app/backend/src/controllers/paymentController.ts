import { Request, Response } from "express";
import PaymentService from "../services/payment.service";

const paymentService = new PaymentService();

export const pay = async (req: Request, res: Response) => {
  const { accountNumber, amount, description } = req.body;

  try {
    const result = await paymentService.pay(
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
