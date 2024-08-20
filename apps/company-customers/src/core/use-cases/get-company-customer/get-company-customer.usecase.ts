import { Err, Ok } from '@ce/shared-core';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { GetCompanyCustomerQuery } from './get-company-customer.query';
import { CompanyCustomerNotFoundError } from '../../errors/company-customer-not-found';

export class GetCompanyCustomerUseCase {
  constructor(private companyCustomerRepository: CompanyCustomerRepository) {}

  async execute(query: GetCompanyCustomerQuery) {
    const companyCustomer = await this.companyCustomerRepository.findById(query.companyCustomerId);

    if (!companyCustomer) {
      return Err.of(new CompanyCustomerNotFoundError(query.companyCustomerId));
    }

    return Ok.of({...companyCustomer.data, password:undefined});
  }
}
