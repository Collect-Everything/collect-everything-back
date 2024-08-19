import { BaseRouter } from "@ce/server-core";
import { AdminController } from "./admins.controller";

export class AdminRouter extends BaseRouter {
  constructor(private readonly controller: AdminController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      "/validate-credentials",
      this.controller.validateCredentials,
    );
  }
}
