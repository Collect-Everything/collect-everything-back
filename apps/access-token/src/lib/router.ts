import { apiConfig } from "../config/api.config";
import express, { Express } from "express";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  app.use(apiConfig.apiPath, baseApiRouter);
};
