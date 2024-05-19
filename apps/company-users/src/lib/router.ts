import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyUserRouter } from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/", companyUserRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
