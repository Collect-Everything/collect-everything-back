import { companyModel } from "../../lib/db";
import { Company } from "../domain/company.entity";
import { CompanyMapper } from "../mappers/company.mapper";
import { CompanyRepository } from "../ports/company.repository";

export class CompanySequelizeRepository implements CompanyRepository {
  constructor() {}

  async save(company: Company) {
    await companyModel.create(CompanyMapper.toPersistence(company));
  }
}
