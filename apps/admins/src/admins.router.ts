import { BaseRouter } from "@ce/server-core";
import { AdminController } from "./admins.controller";

export class AdminRouter extends BaseRouter {
  constructor(private readonly controller: AdminController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/:adminId', [], this.controller.getAdminUser);
    this.router.get('/', [], this.controller.listAdminUsers);

    this.router.post(
      "/validate-credentials",
      this.controller.validateCredentials,
    );
    this.router.post(
      "/register",
      this.controller.register,
    );
  }
}
