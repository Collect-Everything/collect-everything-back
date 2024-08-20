import { Ok } from '@ce/shared-core';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { ListCompanyCustomersQuery } from './list-company-customers.query';

export class ListCompanyCustomersUseCase {
  constructor(private readonly companycustomerRepository: CompanyCustomerRepository) {}

  async execute(query: ListCompanyCustomersQuery) {
    const paginated = await this.companycustomerRepository.findAllPaginated(query);

    return Ok.of({
      ...paginated,
      data: paginated.data.map((companyCustomer) => {
        return {...companyCustomer.data, password:undefined}
      })
    });
  }
}
