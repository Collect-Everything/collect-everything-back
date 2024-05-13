import { CrudRouter } from "@ce/server-core";
import { companyCustomersCtrl } from "./company-customers.controller";

class CompanyCustomersRouter extends CrudRouter {
  constructor() {
    super({
      ctrl: companyCustomersCtrl,
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/validate", [], companyCustomersCtrl.validate);
  }
}

export const companyCustomersRouter = new CompanyCustomersRouter().router;
