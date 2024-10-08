import { apiConfig } from '../config/api.config';
import express, { Express } from 'express';
import {
  authRouter,
  cartAndOrdersRouter,
  companiesRouter,
  companiesCustomersRouter,
  emailValidationRouter
} from '../dependency-injection';

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use('/cart-and-orders', [], cartAndOrdersRouter);
  baseApiRouter.use('/auth', [], authRouter);
  baseApiRouter.use('/companies', [], companiesRouter);
  baseApiRouter.use('/email-validation', [], emailValidationRouter);
  baseApiRouter.use('/company-customers', [], companiesCustomersRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
