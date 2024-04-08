import { CrudRouter } from "@ce/server-core";
import { companyUsersCtrl } from "./company-users.crud.controller";

class CompanyUsersRouter extends CrudRouter {
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
