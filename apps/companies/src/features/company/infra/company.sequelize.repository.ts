import { CompanyRepository } from "../application/company.repository";
import { CompanyModel } from "../model/company.model";
import { CreateCompany } from "../dto";

export class CompanySequelizeRepository implements CompanyRepository {
  constructor() {}

  async create(data: CreateCompany) {
    await CompanyModel.create(data);
  }
}
