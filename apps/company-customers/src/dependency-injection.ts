import { CompanyCustomersController } from "./company-customers.controller";
import { CompanyCustomersRouter } from "./company-customers.router";

const companyCustomersController = new CompanyCustomersController();

const companyCustomersRouter = new CompanyCustomersRouter(
  companyCustomersController,
).router;

export { companyCustomersRouter };
