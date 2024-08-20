import { PaginatedParams, PaginatedResponse } from '@ce/shared-core';
import { CompanyCustomer } from '../domain/company-customer.entity';

export interface CompanyCustomerRepository {
  save(companyUser: CompanyCustomer): Promise<void>;
  findByEmail(email: string): Promise<CompanyCustomer | null>;
  findById(id: string): Promise<CompanyCustomer | null>;
  delete: (id: string) => Promise<void>;
  findAllPaginated(
    params: PaginatedParams
  ): Promise<PaginatedResponse<CompanyCustomer>>;
}
