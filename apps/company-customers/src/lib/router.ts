import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyCustomersRouter } from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/", companyCustomersRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
