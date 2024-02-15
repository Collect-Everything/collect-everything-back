import { CrudRouter } from "@ce/server-core";
import { companyUsersCtrl } from "./company-users.controller";
import { TCustomer } from "@ce/shared-core";

class CompanyUsersRouter extends CrudRouter<TCustomer> {
  constructor() {
    super({
      ctrl: companyUsersCtrl,
    });
  }

  protected addRoutesBeforeCrud() {}
}

export const companyUsersRouter = new CompanyUsersRouter().router;
