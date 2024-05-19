import { BaseRouter } from "@ce/server-core";
import { CompanyUserController } from "./company-user.controller";

export class CompanyUserRouter extends BaseRouter {
  constructor(private readonly controller: CompanyUserController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/register", this.controller.register);
  }
}
