import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyUsersRouter } from "../features/company-users";
import { authRouter } from "../features/auth";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/company_users", companyUsersRouter);
  baseApiRouter.use("/auth", authRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
