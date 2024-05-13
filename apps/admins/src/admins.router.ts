import { BaseRouter } from "@ce/server-core";
import { AdminService } from "./core/application/admin.service";

export class AdminsRouter extends BaseRouter {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  initRoutes() {}
}
