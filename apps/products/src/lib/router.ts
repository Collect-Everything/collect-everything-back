import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { productsRouter } from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/", productsRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
