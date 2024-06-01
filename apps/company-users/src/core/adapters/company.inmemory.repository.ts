import { CompanyRepository } from "../ports/company.repository";

export class InMemoryCompanyRepository implements CompanyRepository {
  companies: string[] = [];
  async countAdmins(companyId: string): Promise<number> {
    return this.companies.filter((c) => c === companyId).length;
  }
}
