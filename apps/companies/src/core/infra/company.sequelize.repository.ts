import { companyModel } from "../../lib/db";
import { CompanyMapper } from "../application/company.mapper";
import { CompanyRepository } from "../application/company.repository";
import { Company } from "../domain/company.entity";

export class CompanySequelizeRepository implements CompanyRepository {
  constructor() {}

  async create(company: Company) {
    await companyModel.create(CompanyMapper.toPersistence(company));
    return null;
  }
}
