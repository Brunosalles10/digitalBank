import express from "express";
import sequelize from "./config/database";
import accountRoutes from "./routes/accountRoutes";
import depositRoutes from "./routes/depositRoutes";
import loginRoutes from "./routes/loginRoutes";
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
