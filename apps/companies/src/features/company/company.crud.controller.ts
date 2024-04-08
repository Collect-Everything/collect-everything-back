import { CrudController } from "@ce/server-core";
import { CompanyModel } from "./model/company.model";
import { CreateCompany, CreateCompanySchema } from "./dto";
import { companyCrudService } from "./application/crud/company.crud.service";
import { UpdateCompany, UpdateCompanySchema } from "./dto/update-company.dto";

class CompanyCrudCtrl extends CrudController<
  CreateCompany,
  UpdateCompany,
  CompanyModel
> {
  constructor() {
    super({
      name: "company",
      service: companyCrudService,
      schemaForCreate: CreateCompanySchema,
      schemaForUpdate: UpdateCompanySchema,
    });
  }
}

export const companyCrudCtrl = new CompanyCrudCtrl();
