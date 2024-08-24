import { Err, Ok, Result } from '@ce/shared-core';
import { CompanyUserRepository } from '../../ports/company-user.repository';
import { ValidateEmailCommand } from './validate-email.command';
import { EmailAlreadyVerifiedError } from './validate-email.errors';
import { CompanyUserNotFoundError } from '../../errors/company-user-not-found';

export class ValidateEmailUseCase {
  constructor(private companyUserRepository: CompanyUserRepository) {}
  async execute(command: ValidateEmailCommand): Promise<Result<void, Error>> {
    const companyUser = await this.companyUserRepository.findById(
      command.userId
    );

    if (!companyUser) {
      return Err.of(new CompanyUserNotFoundError(command.userId));
    }

    if (companyUser.isVerified) {
      return Err.of(new EmailAlreadyVerifiedError(companyUser.email));
    }

    companyUser.validateEmail();

    await this.companyUserRepository.save(companyUser);

    return Ok.of(undefined);
  }
}
