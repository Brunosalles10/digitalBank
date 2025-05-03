import express from "express";
import sequelize from "./config/database";
import accountRoutes from "./routes/accountRoutes";
import cardRoutes from "./routes/cardRoutes";
import depositRoutes from "./routes/depositRoutes";
import loginRoutes from "./routes/loginRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

//routes
app.use(userRoutes);
app.use(loginRoutes);
app.use(accountRoutes);
app.use(transactionRoutes);
app.use(depositRoutes);
app.use(paymentRoutes);
app.use(cardRoutes);

//sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
