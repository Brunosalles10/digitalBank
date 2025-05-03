import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AccountModel from "./AccountModel";

class CardModel extends Model {
  id!: number;
  accountId!: number;
  cardNumber!: string;
  cardType!: "credit" | "debit";
  cardHolderName!: string;
  expirationDate!: string;
  cvv!: string;
  status!: "active" | "blocked" | "expired";
}
CardModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardType: {
      type: DataTypes.ENUM("credit", "debit"),
      allowNull: false,
    },
    cardHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "expired"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "cardModel",
    tableName: "cards",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["cardNumber"],
      },
    ],
  }
);

// Define the relationship between CardModel and AccountModel
CardModel.belongsTo(AccountModel, {
  foreignKey: "accountId",
  as: "account",
});
AccountModel.hasMany(CardModel, {
  foreignKey: "accountId",
  as: "cards",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Generate a unique card number before creating a card
CardModel.beforeCreate(async (card) => {
  if (!card.cardNumber) {
    // Gerar número de cartão único
    if (!card.cardNumber) {
      let unique = false;
      while (!unique) {
        const randomCardNumber = Math.floor(
          100000000000 + Math.random() * 900000000000
        ).toString();

        const formattedCardNumber = randomCardNumber
          .match(/.{1,4}/g)
          ?.join("-");
        const exists = await CardModel.findOne({
          where: { cardNumber: formattedCardNumber },
        });
        if (!exists) {
          card.cardNumber = formattedCardNumber || "";
          unique = true;
        }
      }
    }
  }
  if (!card.expirationDate) {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear() + 3,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    card.expirationDate = expirationDate.toISOString().split("T")[0];
  }
  // Gerar CVV
  if (!card.cvv) {
    const rawCVV = Math.floor(Math.random() * 900 + 100).toString();
    card.cvv = rawCVV;
  }
});

export default CardModel;
