import { CrudRouter } from "@ce/server-core";
import { customersCtrl } from "./customers.controller";
import { TCustomer } from "@ce/shared-core";

class CustomersRouter extends CrudRouter<TCustomer> {
  constructor() {
    super({
      ctrl: customersCtrl,
    });
  }

  protected addRoutesBeforeCrud() {}
}

export const customersRouter = new CustomersRouter().router;
