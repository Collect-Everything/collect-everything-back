import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import {
  authRouter,
  companiesRouter,
} from "../dependency-injection";
import { authRouter, companiesRouter } from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/auth", [], authRouter);
  baseApiRouter.use("/companies", [], companiesRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
