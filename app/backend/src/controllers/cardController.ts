import { Request, Response } from "express";
import AccountModel from "../models/AccountModel";
import CardModel from "../models/CardModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const cards = await CardModel.findAll();
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getCardById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const card = await CardModel.findByPk(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const createCard = async (req: Request, res: Response) => {
  try {
    const { accountId, cardType, cardHolderName, status } = req.body;
    // Validate required fields
    if (!accountId || !cardType || !cardHolderName) {
      return res
        .status(400)
        .json({ error: "accountId, cardType, cardHolderName are required" });
    }

    const card = await CardModel.create({
      accountId,
      cardType,
      cardHolderName,
      status: status || "active",
    });
    return res.status(201).json({
      id: card.id,
      cardType: card.cardType,
      cardHolderName: card.cardHolderName,
      expirationDate: card.expirationDate,
      cardNumber: card.cardNumber,
      cvv: card.cvv,
      status: card.status,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCard = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { cardType, cardHolderName, status } = req.body;
    // Validate required fields
    const card = await CardModel.findByPk(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    await card.update({
      cardType,
      cardHolderName,
      status,
    });
    return res.status(200).json(card);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCard = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const card = await CardModel.findByPk(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    await card.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCardsByAccountNumber = async (req: Request, res: Response) => {
  const { accountNumber } = req.params;
  try {
    const account = await AccountModel.findOne({
      where: { accountNumber },
    });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const cards = await CardModel.findAll({
      where: { accountId: account.id },
    });

    return res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
