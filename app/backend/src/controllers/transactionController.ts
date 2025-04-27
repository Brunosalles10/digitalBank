import { Request, Response } from "express";
import TransactionModel from "../models/TransactionModel";
import { TransferService } from "../services/transfer.service";

//instance of TransferService
const transferService = new TransferService();

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await TransactionModel.findAll();
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTransactionById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const transaction = await TransactionModel.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const {
      senderAccountId,
      receiverAccountId,
      amount,
      transactionType,
      description,
    } = req.body;

    // Validate required fields
    if (!senderAccountId || !receiverAccountId || !amount || !transactionType) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (senderAccountId === receiverAccountId) {
      return res
        .status(400)
        .json({ error: "Sender and receiver accounts cannot be the same" });
    }

    // Validate transaction type
    const validTransactionTypes = ["transfer", "deposit", "payment"];
    if (!validTransactionTypes.includes(transactionType)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    const transaction = await TransactionModel.create({
      senderAccountId,
      receiverAccountId,
      amount,
      transactionType,
      description,
    });

    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const updateTransaction = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const {
      senderAccountId,
      receiverAccountId,
      amount,
      transactionType,
      description,
    } = req.body;

    const transaction = await TransactionModel.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update the transaction
    await transaction.update({
      senderAccountId,
      receiverAccountId,
      amount,
      transactionType,
      description,
    });

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteTransaction = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const transaction = await TransactionModel.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await transaction.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const transferFunds = async (req: Request, res: Response) => {
  const { senderAccountNumber, receiverAccountNumber, amount, description } =
    req.body;
  try {
    const result = await transferService.transferFunds(
      senderAccountNumber,
      receiverAccountNumber,
      parseFloat(amount),
      description
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
