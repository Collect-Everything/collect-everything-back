import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { productsRouter } from "../features/products";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/products", productsRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
