import { Err, Ok, Result } from "@ce/shared-core";
import { CompanyUserRepository } from "../../ports/company-user.repository";
import { ValidateEmailCommand } from "./validate-email.command";
import { EmailAlreadyVerifiedError } from "./validate-email.errors";
import { CompanyUserNotFoundError } from "../../errors/company-user-not-found";

export class ValidateEmailUseCase {
  constructor(private companyUserRepository: CompanyUserRepository) { }
  async execute(command: ValidateEmailCommand): Promise<Result<void, Error>> {
    const companyUsers = await this.companyUserRepository.findByEmail(
      command.email,
    );

    if (!companyUsers || companyUsers.length === 0) {
      return Err.of(new CompanyUserNotFoundError(command.email));
    }

    for (const user of companyUsers) {
      if (user.isVerified) {
        return Err.of(new EmailAlreadyVerifiedError(command.email));
      }

      user.validateEmail();

      await this.companyUserRepository.save(user);
    }


    return Ok.of(undefined);
  }
}
