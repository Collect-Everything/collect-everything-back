import { Err, Ok } from '@ce/shared-core';
import { CompanyRepository } from '../../ports/company.repository';
import { GetCompanyQuery } from './get-company.query';
import { CompanyNotFoundError } from '../../errors/company-not-found';

export class GetCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(query: GetCompanyQuery) {
    const company = await this.companyRepository.findById(query.companyId);

    if (!company) {
      return Err.of(new CompanyNotFoundError(query.companyId));
    }

    return Ok.of(company.data);
  }
}
