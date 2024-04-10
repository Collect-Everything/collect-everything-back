import { CompanyRepository } from "../application/company.repository";
import { CompanyModel } from "../model/company.model";
import { CreateCompany } from "../dto";

export class CompanySequelizeRepository implements CompanyRepository {
  constructor() {}

  async create(data: CreateCompany) {
    const company = await CompanyModel.create(data);
    return company;
  }
}
