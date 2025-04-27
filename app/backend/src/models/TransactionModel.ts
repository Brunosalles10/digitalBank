import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AccountModel from "./AccountModel";
class TransactionModel extends Model {
  id!: number;
  senderAccountId!: number;
  receiverAccountId!: number;
  amount!: number;
  transactionType!: "transfer" | "deposit" | "payment";
  description!: string;
}
TransactionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    transactionType: {
      type: DataTypes.ENUM("transfer", "deposit", "payment"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TransactionModel",
    tableName: "transactions",
    timestamps: true,
  }
);

// Define associations
TransactionModel.belongsTo(AccountModel, {
  foreignKey: "senderAccountId",
  as: "senderAccount",
});
TransactionModel.belongsTo(AccountModel, {
  foreignKey: "receiverAccountId",
  as: "receiverAccount",
});
AccountModel.hasMany(TransactionModel, {
  foreignKey: "senderAccountId",
  as: "sentTransactions",
});
AccountModel.hasMany(TransactionModel, {
  foreignKey: "receiverAccountId",
  as: "receivedTransactions",
});

export default TransactionModel;
