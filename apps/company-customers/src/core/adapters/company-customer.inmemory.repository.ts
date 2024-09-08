import { CompanyCustomerRepository } from '../ports/company-customer.repository';
import { CompanyCustomer } from '../domain/company-customer.entity';
import { PaginatedParams } from '@ce/shared-core';

export class InMemoryCompanyCustomerRepository
  implements CompanyCustomerRepository {
  companyCustomers: CompanyCustomer[] = [];

  async save(companyUser: CompanyCustomer): Promise<void> {
    const exists = await this.findById(companyUser.id);
    if (exists) {
      this.companyCustomers = this.companyCustomers.map((c) =>
        c.id === companyUser.id ? companyUser : c
      );
    } else {
      this.companyCustomers.push(companyUser);
    }
  }

  async findById(id: string): Promise<CompanyCustomer | null> {
    return this.companyCustomers.find((c) => c.id === id) || null;
  }

  async findByEmail(email: string): Promise<CompanyCustomer | null> {
    return this.companyCustomers.find((c) => c.email === email) || null;
  }

  async delete(id: string): Promise<void> {
    this.companyCustomers = this.companyCustomers.filter((c) => c.id !== id);
  }

  async findAllPaginated(
    params: PaginatedParams
  ) {
    return {
      data: this.companyCustomers.filter((product) => {
        return true;
      }),
      total: this.companyCustomers.length,
      limit: params.limit,
      page: params.page,
    };
  }
}
