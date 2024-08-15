import { CompaniesController } from "./companies.controller";
import { BaseRouter } from "@ce/server-core";

export class CompaniesRouter extends BaseRouter {
  constructor(private readonly companiesCtrl: CompaniesController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get("/", this.companiesCtrl.listCompanies);
  }
}
