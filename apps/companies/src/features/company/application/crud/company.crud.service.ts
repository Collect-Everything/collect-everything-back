import { SequelizeService } from "@ce/sequelize";
import { CreateCompany } from "../../dto";
import { Company, CompanyModel } from "../../model/company.model";
import { apiConfig } from "../../../../config/api.config";

class CompanyCrudService extends SequelizeService<
  CreateCompany,
  Company,
  CompanyModel
> {
  constructor() {
    super(CompanyModel, apiConfig);
  }
}

export const companyCrudService = new CompanyCrudService();
