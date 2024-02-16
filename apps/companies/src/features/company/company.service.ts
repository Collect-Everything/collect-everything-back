import { TCompany, TCompanyBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { CompanyModel } from "./company.model";

class CompanyService extends SequelizeService<
  TCompanyBase,
  TCompany,
  CompanyModel
> {
  constructor() {
    super(CompanyModel, apiConfig);
  }
}

export const companyService = new CompanyService();
