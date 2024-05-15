import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { emailValidationRouter } from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/email-validation", [], emailValidationRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
