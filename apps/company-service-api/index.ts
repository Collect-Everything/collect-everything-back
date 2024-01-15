import express from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { router } from "./routes";
import { validateCustomHeader } from "./utils/validateCustomHeader";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json(), validateCustomHeader, router);

// Configuration de Sequelize
export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
