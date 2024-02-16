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
    this.router.post("/login", [], companyUsersCtrl.login);
    this.router.post("/register", [], companyUsersCtrl.register);
    this.router.post("/refresh", [], companyUsersCtrl.refreshToken);
  }
}

export const companyUsersRouter = new CompanyUsersRouter().router;
