import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";

class AccountModel extends Model {
  id!: number;
  userId!: number;
  accountNumber!: string;
  balance!: number;
  type!: "current" | "payment";
}

AccountModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 20],
      },
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    type: {
      type: DataTypes.ENUM("current", "payment"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AccountModel",
    tableName: "accounts",
    timestamps: true,
  }
);

AccountModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});
UserModel.hasMany(AccountModel, {
  foreignKey: "userId",
  as: "accounts",
});

// Generate a unique account number before creating an account
AccountModel.beforeCreate(async (account: AccountModel) => {
  if (!account.accountNumber) {
    let unique = false;
    let generatedAccountNumber = "";
    while (!unique) {
      generatedAccountNumber = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 10)
      ).join("");
      const existingAccount = await AccountModel.findOne({
        where: { accountNumber: generatedAccountNumber },
      });
      if (!existingAccount) {
        unique = true;
      }
    }
    account.accountNumber = generatedAccountNumber;
  }
});

export default AccountModel;
