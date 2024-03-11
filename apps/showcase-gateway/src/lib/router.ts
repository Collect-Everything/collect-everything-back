import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyUsersRouter } from "../features/customers";
import { isLogged } from "@ce/server-core";
import { companiesRouter } from "../features/companies";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/company-users", [isLogged], companyUsersRouter);
  baseApiRouter.use("/companies", [], companiesRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};