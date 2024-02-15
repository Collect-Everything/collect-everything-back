import { CrudRouter } from "@ce/server-core";
import { TAdmin } from "@ce/shared-core";
import { adminsCtrl } from "./admins.controller";

class AdminsRouter extends CrudRouter<TAdmin> {
  constructor() {
    super({
      ctrl: adminsCtrl,
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/login", [], adminsCtrl.login);
    this.router.post("/register", [], adminsCtrl.register);
    this.router.post("/refresh", [], adminsCtrl.refreshToken);
  }
}

export const adminsRouter = new AdminsRouter().router;
