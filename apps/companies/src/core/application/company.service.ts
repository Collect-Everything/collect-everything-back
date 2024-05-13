import { CreateCompany } from "@ce/shared-core";
import { Company } from "../domain/company.entity";
import { CompanyRepository } from "./company.repository";
import { IDProvider } from "./id-provider";

export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly IDProvider: IDProvider,
  ) {}

  async create(data: CreateCompany) {
    const company = Company.fromData({
      ...data,
      id: this.IDProvider.generate(),
    });
    await this.companyRepository.create(company);
  }
}
