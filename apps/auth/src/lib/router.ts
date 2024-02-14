import { apiConfig } from "../config/api.config";
import express, { Express } from "express";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.get("/ping", (_req, res) => res.status(200).send("API OK !"));

  app.use(apiConfig.apiPath, baseApiRouter);
};
