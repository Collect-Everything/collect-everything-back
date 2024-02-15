import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { authRouter } from "../features/auth";
import { adminsRouter } from "../features/admins";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/admins", adminsRouter);
  baseApiRouter.use("/auth", authRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
