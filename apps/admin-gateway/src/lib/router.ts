import { apiConfig } from "../config/api.config";
import express, { Express } from "express";
import { companyUsersRouter } from "../features/company-users";
import { adminsRouter } from "../features/admins";
import { productsRouter } from "../features/products";
import { categoriesRouter } from "../features/categories";
import { companiesRouter } from "../features/companies";
import { companyCustomersRouter } from "../features/company-customers";

export const createApiRouter = (app: Express) => {
  const baseApiRouter = express.Router();

  baseApiRouter.use("/company-users", companyUsersRouter);
  baseApiRouter.use("/admins", adminsRouter);
  baseApiRouter.use("/products", productsRouter);
  baseApiRouter.use("/categories", categoriesRouter);
  baseApiRouter.use("/companies", companiesRouter);
  baseApiRouter.use("/company-customers", companyCustomersRouter);

  app.use(apiConfig.apiPath, baseApiRouter);
};
