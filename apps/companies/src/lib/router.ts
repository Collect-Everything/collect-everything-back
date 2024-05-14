import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyRouter } from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/companies", companyRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
