import { BaseController } from "@ce/server-core";
import { AdminService } from "./core/application/admin.service";

class AdminController extends BaseController {
  constructor(private readonly adminService: AdminService) {
    super("Admin");
  }
}
