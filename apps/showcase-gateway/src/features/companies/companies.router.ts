import { CrudRouter } from "@ce/server-core";
import { TCompany } from "@ce/shared-core";
import { companiesCtrl } from "./companies.controller";

class CompaniesRouter extends CrudRouter<TCompany> {
  constructor() {
    super({
      ctrl: companiesCtrl,
    });
  }

  protected addRoutesBeforeCrud() {}
}

export const companiesRouter = new CompaniesRouter().router;
