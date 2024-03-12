import express from "express";
import { companyCustomersCtrl } from "./company-customers.controller";
import { isLogged } from "@ce/server-core";

const companyCustomersRouter = express.Router();
companyCustomersRouter.get(
  "/",
  [isLogged],
  companyCustomersCtrl.getlistCompanyCustomers
);
companyCustomersRouter.get(
  "/:id",
  [isLogged],
  companyCustomersCtrl.getOneCompanyCustomer
);
companyCustomersRouter.post(
  "/",
  [isLogged],
  companyCustomersCtrl.createCompanyCustomer
);
companyCustomersRouter.patch(
  "/:id",
  [isLogged],
  companyCustomersCtrl.updateCompanyCustomer
);
companyCustomersRouter.delete(
  "/:id",
  [isLogged],
  companyCustomersCtrl.deleteCompanyCustomer
);

export { companyCustomersRouter };
