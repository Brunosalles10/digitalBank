import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3000;
app.use(express.json());

//routes
app.use(userRoutes);

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
