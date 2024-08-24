import { Err, Ok } from '@ce/shared-core';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { UpdateCommand } from './update.command';
import { CompanyCustomerNotFoundError } from '../../errors/company-customer-not-found';

export class UpdateUseCase {
  constructor(private readonly repository: CompanyCustomerRepository) {}

  async execute(command: UpdateCommand) {
    const companyCustomer = await this.repository.findById(command.id);

    if (!companyCustomer) {
      return Err.of(new CompanyCustomerNotFoundError(command.id));
    }

    companyCustomer.update({
      email: command.email,
      firstname: command.firstname,
      lastname: command.lastname
    });

    await this.repository.save(companyCustomer);

    return Ok.of(undefined);
  }
}
