import { Err, Ok } from '@ce/shared-core';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { DeleteCommand } from './delete.command';
import { CompanyCustomerNotFoundError } from '../../errors/company-customer-not-found';

export class DeleteUseCase {
  constructor(
    private readonly companyUserRepository: CompanyCustomerRepository
  ) {}

  async execute(command: DeleteCommand) {
    const companyUser = await this.companyUserRepository.findById(command.id);

    if (!companyUser) {
      return Err.of(new CompanyCustomerNotFoundError(command.id));
    }

    await this.companyUserRepository.delete(command.id);
    return Ok.of(undefined);
  }
}
