import { Err, Ok } from '@ce/shared-core';
import { CompanyRepository } from '../../ports/company.repository';
import { CompanyNotFoundError } from '../../errors/company-not-found';
import { GetCompanyBySlugQuery } from './get-company-by-slug.query';

export class GetCompanyBySlugUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(query: GetCompanyBySlugQuery) {
    const company = await this.companyRepository.findByStoreSlug(query.slug);

    if (!company) {
      return Err.of(new CompanyNotFoundError(query.slug));
    }

    return Ok.of(company.data);
  }
}
