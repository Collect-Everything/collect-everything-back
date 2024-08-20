import { Err, Ok } from '@ce/shared-core';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { UpdateCommand } from './update.command';
import { CompanyUserNotFoundError } from '../../errors/company-customer-not-found';

export class UpdateUseCase {
  constructor(private readonly repository: CompanyCustomerRepository) {}

  async execute(command: UpdateCommand) {
    const companyUser = await this.repository.findById(command.id);

    if (!companyUser) {
      return Err.of(new CompanyUserNotFoundError());
    }

    companyUser.update({
      email: command.email,
      firstname: command.firstname,
      lastname: command.lastname
    });

    await this.repository.save(companyUser);

    return Ok.of(undefined);
  }
}
