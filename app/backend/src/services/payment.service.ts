import sequelize from "../config/database";
import AccountModel from "../models/AccountModel";
import TransactionModel from "../models/TransactionModel";

export class PaymentService {
  async pay(accountNumber: string, amount: number, description?: string) {
    if (!accountNumber || !amount) {
      throw new Error("All fields are required (accountNumber, amount)");
    }

    if (amount <= 0) {
      throw new Error("Payment amount must be greater than zero.");
    }

    const transaction = await sequelize.transaction();
    try {
      const account = await AccountModel.findOne({
        where: { accountNumber },
        transaction,
      });

      if (!account) {
        await transaction.rollback();
        throw new Error("Account not found.");
      }

      const currentBalance = parseFloat(account.balance.toString());
      const paymentAmount = parseFloat(amount.toString());

      if (currentBalance < paymentAmount) {
        await transaction.rollback();
        throw new Error("Insufficient balance for payment.");
      }

      account.balance = parseFloat((currentBalance - paymentAmount).toFixed(2));

      await account.save({ transaction });

      await TransactionModel.create(
        {
          senderAccountId: account.id,
          receiverAccountId: account.id,
          amount: paymentAmount,
          transactionType: "payment",
          description: description || "Account payment",
        },
        { transaction }
      );

      await transaction.commit();
      return {
        message: "Payment successful.",
        paymentDetails: {
          from: accountNumber,
          amount: paymentAmount.toFixed(2),
          description: description || "Account payment",
        },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  }
}

export default PaymentService;
