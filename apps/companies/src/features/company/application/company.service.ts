import { CreateCompany } from "../dto";
import { CompanySequelizeRepository } from "../infra/company.sequelize.repository";

export class CompanyService {
  constructor(
    private readonly companySequelizeRepository: CompanySequelizeRepository
  ) {}

  async create(data: CreateCompany) {
    const company = await this.companySequelizeRepository.create(data);

    return company;
  }
}
