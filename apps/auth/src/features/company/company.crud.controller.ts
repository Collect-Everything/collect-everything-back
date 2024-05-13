import { CrudController } from "@ce/server-core";
import { CreateCompanySchema, UpdateCompanySchema } from "@ce/shared-core";
import { companyCrudService } from "./application/crud/company.crud.service";

class CompanyCrudCtrl extends CrudController {
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
