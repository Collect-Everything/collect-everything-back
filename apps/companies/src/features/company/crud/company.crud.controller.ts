import { CrudController } from "@ce/server-core";
import { companyService } from "./company.crud.service";
import { Company, CompanyModel } from "../company.model";
import {
  CreateCompany,
  CreateCompanySchema,
  CompanySchema,
} from "@ce/shared-core";

class CompanyCrudCtrl extends CrudController<
  CreateCompany,
  Company,
  CompanyModel
> {
  constructor() {
    super({
      name: "company",
      service: companyService,
      baseSchema: CreateCompanySchema,
      schema: CompanySchema,
    });
  }
}

export const companyCrudCtrl = new CompanyCrudCtrl();
