import { Err, Ok } from '@ce/shared-core';
import { CompanyRepository } from '../../ports/company.repository';
import { GetStoreConfigurationQuery } from './get-store-configuration.query';
import { CompanyNotFoundError } from '../../errors/company-not-found';
import { StoreNotConfiguredError } from './get-store-configuration.errors';

export class GetStoreConfigurationUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(query: GetStoreConfigurationQuery) {
    const company = await this.companyRepository.findById(query.companyId);
    if (!company) {
      return Err.of(new CompanyNotFoundError(query.companyId));
    }

    if (!company.storeConfiguration) {
      return Err.of(new StoreNotConfiguredError());
    }

    return Ok.of(company.storeConfiguration.data);
  }
}
