import { BaseRouter } from "@ce/server-core";
import { CompanyCustomersController } from "./company-customers.controller";

export class CompanyCustomersRouter extends BaseRouter {
  constructor(private readonly companyUsersCtrl: CompanyCustomersController) {
    super();
  }
}
