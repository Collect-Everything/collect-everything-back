import { CrudRouter } from "@ce/server-core";
import { TCustomer } from "@ce/shared-core";
import { adminsCtrl } from "./admins.controller";

class AdminsRouter extends CrudRouter<TCustomer> {
  constructor() {
    super({
      ctrl: adminsCtrl,
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/validate", [], adminsCtrl.validate);
  }
}

export const adminsRouter = new AdminsRouter().router;
