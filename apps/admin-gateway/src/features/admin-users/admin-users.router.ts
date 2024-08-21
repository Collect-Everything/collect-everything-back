import { BaseRouter } from "@ce/server-core";
import { AdminUserController } from "./admin-users.controller";

export class AdminUserRouter extends BaseRouter {
  constructor(private readonly controller: AdminUserController) {
    super();

    this.initRoutes();
  }
  
  initRoutes() {
    this.router.get("/", this.controller.listAdmins);

    this.router.get("/:adminId", this.controller.getAdmin);

    this.router.post(
      "/register",
      [],
      this.controller.registerAdmin,
    );
  }
}
