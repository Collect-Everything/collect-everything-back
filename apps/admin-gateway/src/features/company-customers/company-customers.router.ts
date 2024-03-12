import express from "express";
import { companyCustomersCtrl } from "./company-customers.controller";

const companyCustomersRouter = express.Router();
companyCustomersRouter.get(
  "/",
  [],
  companyCustomersCtrl.getlistCompanyCustomers
);
companyCustomersRouter.get(
  "/:id",
  [],
  companyCustomersCtrl.getOneCompanyCustomer
);
companyCustomersRouter.post(
  "/",
  [],
  companyCustomersCtrl.createCompanyCustomer
);
companyCustomersRouter.patch(
  "/:id",
  [],
  companyCustomersCtrl.updateCompanyCustomer
);
companyCustomersRouter.delete(
  "/:id",
  [],
  companyCustomersCtrl.deleteCompanyCustomer
);

export { companyCustomersRouter };
