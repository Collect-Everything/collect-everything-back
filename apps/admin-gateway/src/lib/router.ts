import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import {
  authRouter,
  companiesRouter,
  companyUsersRouter,
} from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/auth", [], authRouter);
  baseApiRouter.use("/companies", [], companiesRouter);
  baseApiRouter.use("/company-users", [], companyUsersRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
