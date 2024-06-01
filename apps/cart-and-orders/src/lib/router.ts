import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { cartRouter } from "../modules/cart";
import { ordersRouter } from "../modules/orders";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use("/cart", cartRouter);
  baseApiRouter.use("/orders", ordersRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
