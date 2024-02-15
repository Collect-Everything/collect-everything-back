import { CrudRouter } from "@ce/server-core";
import { TCustomer } from "@ce/shared-core";
import { customersCtrl } from "./company-users.controller";

class CustomersRouter extends CrudRouter<TCustomer> {
  constructor() {
    super({
      ctrl: customersCtrl,
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/validate", [], customersCtrl.validate);
  }
}

export const customersRouter = new CustomersRouter().router;
