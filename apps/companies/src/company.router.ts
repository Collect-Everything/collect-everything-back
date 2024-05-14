import { BaseRouter } from "@ce/server-core";
import { CompanyController } from "./company.controller";

export class CompanyRouter extends BaseRouter {
  constructor(private controller: CompanyController) {
    super();
  }

  initRoutes(): void {}
}
