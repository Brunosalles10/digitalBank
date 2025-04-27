import sequelize from "../config/database";
import AccountModel from "../models/AccountModel";
import TransactionModel from "../models/TransactionModel";

export class TransferService {
  async transferFunds(
    senderAccountNumber: string,
    receiverAccountNumber: string,
    amount: number,
    description?: string
  ) {
    if (!senderAccountNumber || !receiverAccountNumber || !amount) {
      throw new Error(
        "All fields are required (senderAccountNumber, receiverAccountNumber, amount)"
      );
    }

    if (senderAccountNumber === receiverAccountNumber) {
      throw new Error("Cannot transfer to the same account.");
    }

    const transaction = await sequelize.transaction();
    try {
      const senderAccount = await AccountModel.findOne({
        where: { accountNumber: senderAccountNumber },
        transaction,
      });
      const receiverAccount = await AccountModel.findOne({
        where: { accountNumber: receiverAccountNumber },
        transaction,
      });

      if (!senderAccount || !receiverAccount) {
        await transaction.rollback();
        throw new Error("Sender or receiver account not found.");
      }

      const senderBalance = parseFloat(senderAccount.balance.toString());
      const receiverBalance = parseFloat(receiverAccount.balance.toString());
      const transferAmount = parseFloat(amount.toString());

      if (senderBalance < transferAmount) {
        await transaction.rollback();
        throw new Error("Insufficient balance in sender's account.");
      }

      senderAccount.balance = parseFloat(
        (senderBalance - transferAmount).toFixed(2)
      );
      receiverAccount.balance = parseFloat(
        (receiverBalance + transferAmount).toFixed(2)
      );

      await senderAccount.save({ transaction });
      await receiverAccount.save({ transaction });

      await TransactionModel.create(
        {
          senderAccountId: senderAccount.id,
          receiverAccountId: receiverAccount.id,
          amount: transferAmount,
          transactionType: "transfer",
          description: description || "Fund transfer",
        },
        { transaction }
      );
      await transaction.commit();
      return {
        message: "Transfer successful.",
        transferDetails: {
          from: senderAccountNumber,
          to: receiverAccountNumber,
          amount: transferAmount.toFixed(2),
          description: description || "Fund transfer",
        },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  }
}

export default TransferService;
