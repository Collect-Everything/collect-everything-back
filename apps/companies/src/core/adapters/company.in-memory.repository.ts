import { Company } from "../domain/company.entity";

export class InMemoryCompanyRepository {
  companies: Company[] = [];
  async save(company: Company) {
    const exists = await this.findById(company.id);
    if (exists) {
      this.companies = this.companies.map((c) =>
        c.id === company.id ? company : c,
      );
    } else {
      this.companies.push(company);
    }
  }

  async findById(id: string) {
    return this.companies.find((c) => c.id === id);
  }

  async findByName(name: string) {
    return this.companies.find((c) => c.name === name);
  }
}
