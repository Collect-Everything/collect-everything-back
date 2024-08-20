import { Err, Ok, Result } from '@ce/shared-core';
import { CompanyRepository } from '../../ports/company.repository';
import { ConfigureStoreCommand } from './configure-store.command';
import { StoreNameAlreadyExistsError } from './configure-store.errors';
import { CompanyNotFoundError } from '../../errors/company-not-found';
import { slugify } from '@ce/utils';

export class ConfigureStoreUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(command: ConfigureStoreCommand): Promise<Result<void, Error>> {
    try {
      const storeSlug = slugify(command.storeName);
      const companyWithSameStoreSlug =
        await this.companyRepository.findByStoreSlug(command.storeName);

      if (companyWithSameStoreSlug) {
        return Err.of(new StoreNameAlreadyExistsError(command.storeName));
      }

      const company = await this.companyRepository.findById(command.companyId);

      if (!company) {
        return Err.of(new CompanyNotFoundError(command.companyId));
      }

      company.configureStore({
        storeName: command.storeName,
        storeSlug,
        color: command.color,
        logo: command.logo,
        keyPhrases: command.keyPhrases,
        productsType: command.productsType,
        phoneContact: command.phoneContact,
        emailContact: command.emailContact,
        links: command.links,
        externalUrl: command.externalUrl
      });

      await this.companyRepository.save(company);

      return Ok.of(undefined);
    } catch (error) {
      return Err.of(error as Error);
    }
  }
}
