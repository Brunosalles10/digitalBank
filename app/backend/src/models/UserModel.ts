import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserModel extends Model {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  cpf: string | undefined;
  phone: string | undefined;

  public async hasPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password!);
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["cpf"],
      },
    ],
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hasPassword();
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hasPassword();
  }
});

export default UserModel;
