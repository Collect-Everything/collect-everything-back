import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyCustomersRouter } from "../features/company-customers";
import { authRouter } from "../features/auth";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/company_customers", companyCustomersRouter);
  baseApiRouter.use("/auth", authRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
