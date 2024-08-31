import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import {
  authRouter,
  companiesRouter,
  companyUsersRouter,
  emailValidationRouter,
  productsRouter,
} from "../dependency-injection";
import { jwtMiddleware } from "@ce/server-core";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/auth", [], authRouter);
  baseApiRouter.use("/companies", [], companiesRouter);
  baseApiRouter.use("/company-users", [], companyUsersRouter);
  baseApiRouter.use("/email-validation", [], emailValidationRouter);
  baseApiRouter.use("/products", [jwtMiddleware], productsRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
