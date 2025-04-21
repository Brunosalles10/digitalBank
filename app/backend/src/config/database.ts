import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "database",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT as any,
    port: Number(process.env.DB_PORT) || 3306,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conection has been established successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

export default sequelize;
