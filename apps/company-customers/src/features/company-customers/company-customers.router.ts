import { CrudRouter } from "@ce/server-core";
import { companyCustomersCtrl } from "./company-customers.controller";
import { TCompanyCustomer } from "@ce/shared-core";

class CompanyCustomersRouter extends CrudRouter<TCompanyCustomer> {
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
