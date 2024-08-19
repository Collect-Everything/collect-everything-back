import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { adminRouter } from "../dependency-injection";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/", adminRouter)

  app.use(apiConfig.apiPath, baseApiRouter);

};
