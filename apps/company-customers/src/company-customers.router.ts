import { BaseRouter } from "@ce/server-core";
import { CompanyCustomersController } from "./company-customers.controller";

export class CompanyCustomersRouter extends BaseRouter {
  constructor(private controller: CompanyCustomersController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    //this.router.post("/create", [], this.controller.create);
  }
}
