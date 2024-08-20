import { CompanyCustomerRepository } from '../ports/company-customer.repository';
import { CompanyCustomer } from '../domain/company-customer.entity';

export class InMemoryCompanyCustomerRepository
  implements CompanyCustomerRepository
{
  companyUsers: CompanyCustomer[] = [];

  async save(companyUser: CompanyCustomer): Promise<void> {
    const exists = await this.findById(companyUser.id);
    if (exists) {
      this.companyUsers = this.companyUsers.map((c) =>
        c.id === companyUser.id ? companyUser : c
      );
    } else {
      this.companyUsers.push(companyUser);
    }
  }

  async findById(id: string): Promise<CompanyCustomer | null> {
    return this.companyUsers.find((c) => c.id === id) || null;
  }

  async findByEmail(email: string): Promise<CompanyCustomer | null> {
    return this.companyUsers.find((c) => c.email === email) || null;
  }

  async delete(id: string): Promise<void> {
    this.companyUsers = this.companyUsers.filter((c) => c.id !== id);
  }
}
