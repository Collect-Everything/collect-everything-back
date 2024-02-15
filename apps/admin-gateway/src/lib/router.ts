import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyUsersRouter } from "../features/customers";
import { adminsRouter } from "../features/admins";
import { isLogged } from "@ce/server-core";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/company-users", [isLogged], companyUsersRouter);
  baseApiRouter.use("/admins", adminsRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
