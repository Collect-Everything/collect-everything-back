import { Company } from "../domain/company.entity";
import { CompanyRepository } from "../ports/company.repository";

export class InMemoryCompanyRepository implements CompanyRepository {
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

  async findByNameOrEmail(name: string, email: string) {
    return this.companies.find((c) => c.name === name || c.email === email);
  }

  async findByStoreName(storeName: string) {
    return this.companies.find(
      (c) => c.storeConfiguration?.props.storeName === storeName,
    );
  }

  async findAllPaginated() {
    return {
      data: this.companies,
      total: this.companies.length,
      page: 0,
      limit: this.companies.length,
    };
  }
}
