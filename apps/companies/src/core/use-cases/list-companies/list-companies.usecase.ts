import { Ok } from '@ce/shared-core';
import { CompanyRepository } from '../../ports/company.repository';
import { ListCompaniesQuery } from './list-companies.query';

export class ListCompaniesUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(query: ListCompaniesQuery) {
    const paginated = await this.companyRepository.findAllPaginated(query);

    return Ok.of({
      ...paginated,
      data: paginated.data.map((company) => company.data)
    });
  }
}
