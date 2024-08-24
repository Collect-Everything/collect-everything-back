import { Err, Ok, Result } from '@ce/shared-core';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { ValidateEmailCommand } from './validate-email.command';
import { EmailAlreadyVerifiedError } from './validate-email.errors';
import { CompanyCustomerNotFoundError } from '../../errors/company-customer-not-found';

export class ValidateEmailUseCase {
  constructor(private companyUserRepository: CompanyCustomerRepository) {}
  async execute(command: ValidateEmailCommand): Promise<Result<void, Error>> {
    try {
      const companyUser = await this.companyUserRepository.findById(
        command.customerId
      );

      if (!companyUser) {
        return Err.of(new CompanyCustomerNotFoundError(command.customerId));
      }

      if (companyUser.isVerified) {
        return Err.of(new EmailAlreadyVerifiedError(companyUser.email));
      }

      companyUser.validateEmail();

      await this.companyUserRepository.save(companyUser);

      return Ok.of(undefined);
    } catch (error) {
      return Err.of(error as Error);
    }
  }
}
