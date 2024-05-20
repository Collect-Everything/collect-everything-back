import { Err, Ok, Result } from "@ce/shared-core";
import { CompanyUserRepository } from "../../ports/company-user.repository";
import { ValidateCredentialsQuery } from "./validate-credentials.query";
import { ValidateCredentialsResponse } from "./validate-credentials.response";
import { PasswordHasher } from "../../ports/password-hasher";
import { InvalidCredentialsError } from "./valide-credentials.errors";

export class ValidateCredentialsUseCase {
  constructor(
    private companyUserRepository: CompanyUserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(
    query: ValidateCredentialsQuery,
  ): Promise<Result<ValidateCredentialsResponse, InvalidCredentialsError>> {
    try {
      const companyUser = await this.companyUserRepository.findByEmail(
        query.email,
      );

      if (!companyUser) {
        return Err.of(new InvalidCredentialsError());
      }
      const isValid = await this.passwordHasher.compare(
        query.password,
        companyUser.data.password,
      );

      if (!isValid) {
        return Err.of(new InvalidCredentialsError());
      }

      return Ok.of({
        id: companyUser.id,
        email: companyUser.email,
        firstname: companyUser.firstname,
        lastname: companyUser.lastname,
        role: companyUser.role,
        companyId: companyUser.companyId,
      });
    } catch (error) {
      return Err.of(new InvalidCredentialsError());
    }
  }
}
