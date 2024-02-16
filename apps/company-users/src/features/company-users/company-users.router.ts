import { CrudRouter } from "@ce/server-core";
import { companyUsersCtrl } from "./company-users.controller";
import { TCompanyUser } from "@ce/shared-core";

class CompanyUsersRouter extends CrudRouter<TCompanyUser> {
  constructor() {
    super({
      ctrl: companyUsersCtrl,
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/validate", [], companyUsersCtrl.validate);
  }
}

export const companyUsersRouter = new CompanyUsersRouter().router;
