import { CrudController } from "@ce/server-core";
import { companyService } from "./company.service";
import {
  CompanyBaseSchema,
  CompanySchema,
  TCompany,
  TCompanyBase,
} from "@ce/shared-core";
import { CompanyModel } from "./company.model";

class CompanyCtrl extends CrudController<TCompanyBase, TCompany, CompanyModel> {
  constructor() {
    super({
      name: "company",
      service: companyService,
      baseSchema: CompanyBaseSchema,
      schema: CompanySchema,
    });
  }
}

export const companyCtrl = new CompanyCtrl();
