import { BaseRouter } from "@ce/server-core";
import { CompanyCustomersController } from "./company-customers.controller";

export class CompanyCustomersRouter extends BaseRouter {
  constructor(private readonly companyCustomersCtrl: CompanyCustomersController) {
    super();
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get("/", this.companyCustomersCtrl.listCompanyCustomers);

    this.router.get("/:companyUserId", this.companyCustomersCtrl.getCompanyCustomer);
  }
}
