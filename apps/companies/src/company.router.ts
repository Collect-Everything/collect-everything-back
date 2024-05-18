import { BaseRouter } from "@ce/server-core";
import { CompanyController } from "./company.controller";

export class CompanyRouter extends BaseRouter {
  constructor(private controller: CompanyController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post("/create", [], this.controller.createCompany);
  }
}
