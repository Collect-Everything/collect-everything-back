import { CreateCompany } from "@ce/shared-core";
import { CompanyRepository } from "../application/company.repository";
import { CompanyModel } from "../company.model";

export class CompanySequelizeRepository implements CompanyRepository {
  constructor() {}

  async create(data: CreateCompany) {
    await CompanyModel.create(data);
  }
}
