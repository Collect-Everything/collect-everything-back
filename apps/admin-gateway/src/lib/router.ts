import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { customersRouter } from "../features/customers";
import { adminsRouter } from "../features/admins";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/customers", customersRouter);
  baseApiRouter.use("/admins", adminsRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
