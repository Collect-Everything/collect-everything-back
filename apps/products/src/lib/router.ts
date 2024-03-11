import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { productsRouter } from "../features/products";
import { categoriesRouter } from "../features/categories";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/products", productsRouter);
  baseApiRouter.use("/categories", categoriesRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
