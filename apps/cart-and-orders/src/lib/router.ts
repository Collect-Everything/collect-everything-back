import { apiConfig } from '../config/api.config';
import express, { Express } from 'express';
import { cartRouter, orderRouter } from '../dependency-injection';

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use('/cart', cartRouter);
  baseApiRouter.use('/order', orderRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
