import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyUsersRouter } from "../features/company-users";
import { companiesRouter } from "../features/companies";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/companies", [], companiesRouter);
  baseApiRouter.use("/company-users", [], companyUsersRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
