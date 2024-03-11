import { CrudRouter } from "@ce/server-core";
import { TCompany } from "@ce/shared-core";
import { companyCtrl } from "./company.controller";

class CompanyRouter extends CrudRouter<TCompany> {
  constructor() {
    super({
      ctrl: companyCtrl,
      middlewares: {
        list: [],
      },
    });
  }

  protected addRoutesBeforeCrud() {}
}

export const companyRouter = new CompanyRouter().router;
