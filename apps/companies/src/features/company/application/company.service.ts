import { CreateCompany } from "@ce/shared-core";
import { CompanyRepository } from "./company.repository";

export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(data: CreateCompany) {
    await this.companyRepository.create(data);
  }
}
