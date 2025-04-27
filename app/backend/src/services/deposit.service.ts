import sequelize from "../config/database";
import AccountModel from "../models/AccountModel";
import TransactionModel from "../models/TransactionModel";

export class DepositService {
  async depositFunds(
    accountNumber: string,
    amount: number,
    description?: string
  ) {
    if (!accountNumber || !amount) {
      throw new Error("All fields are required (accountNumber, amount)");
    }

    if (amount <= 0) {
      throw new Error("Deposit amount must be greater than zero.");
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
      const depositAmount = parseFloat(amount.toString());

      account.balance = parseFloat((currentBalance + depositAmount).toFixed(2));

      await account.save({ transaction });

      await TransactionModel.create(
        {
          senderAccountId: account.id,
          receiverAccountId: account.id,
          amount: depositAmount,
          transactionType: "deposit",
          description: description || "Deposit to account",
        },
        { transaction }
      );

      await transaction.commit();
      return {
        message: "Deposit successful.",
        depositDetails: {
          to: accountNumber,
          amount: depositAmount.toFixed(2),
          description: description || "Deposit to account",
        },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  }
}

export default DepositService;
