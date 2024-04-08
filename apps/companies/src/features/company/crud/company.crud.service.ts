import { CreateCompany, TCompany } from "@ce/shared-core";
import { apiConfig } from "../../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { Company, CompanyModel } from "../company.model";

class CompanyService extends SequelizeService<
  CreateCompany,
  Company,
  CompanyModel
> {
  constructor() {
    super(CompanyModel, apiConfig);
  }
}

export const companyService = new CompanyService();
