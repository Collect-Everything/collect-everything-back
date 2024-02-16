import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { ProductsRouter } from "../features/products";
import { authRouter } from "../features/auth";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/products", ProductsRouter);
  baseApiRouter.use("/auth", authRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
