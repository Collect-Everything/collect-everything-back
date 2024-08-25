import { Err, Ok, Result, withoutUndefinedProperties } from '@ce/shared-core';
import { CompanyRepository } from '../../ports/company.repository';
import { ConfigureStoreCommand } from './configure-store.command';
import {
  NoStoreToConfigureError,
  StoreNameAlreadyExistsError
} from './configure-store.errors';
import { CompanyNotFoundError } from '../../errors/company-not-found';
import { slugify } from '@ce/utils';

export class ConfigureStoreUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(command: ConfigureStoreCommand): Promise<Result<void, Error>> {
    const company = await this.companyRepository.findById(command.companyId);

    if (!company) {
      return Err.of(new CompanyNotFoundError(command.companyId));
    }

    let storeSlug = company.storeConfiguration?.storeSlug;
    let storeName = company.storeConfiguration?.storeName;

    if (command.storeName) {
      storeName = command.storeName;
      storeSlug = slugify(command.storeName);
      const companyWithSameStoreSlug =
        await this.companyRepository.findByStoreSlug(storeSlug);

      if (
        companyWithSameStoreSlug &&
        companyWithSameStoreSlug.id !== company.id
      ) {
        return Err.of(new StoreNameAlreadyExistsError(command.storeName));
      }
    }

    if (!storeSlug || !storeName) {
      return Err.of(new NoStoreToConfigureError());
    }

    company.configureStore(
      withoutUndefinedProperties({
        storeName,
        storeSlug,
        color: command.color,
        logo: command.logo,
        title: command.title,
        description: command.description,
        button: command.button,
        image: command.image,
        advantages: command.advantages,
        productsType: command.productsType,
        phoneContact: command.phoneContact,
        emailContact: command.emailContact,
        instagramUrl: command.instagramUrl,
        twitterUrl: command.twitterUrl,
        facebookUrl: command.facebookUrl,
        externalUrl: command.externalUrl
      })
    );

    await this.companyRepository.save(company);

    return Ok.of(undefined);
  }
}
