import { apiConfig } from '../config/api.config';
import express, { Express } from 'express';
import { companyCustomerRouter } from '../dependency-injection';

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();
  baseApiRouter.use('/', companyCustomerRouter);
  baseApiRouter.use("/:companyCustomerId", companyCustomerRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
