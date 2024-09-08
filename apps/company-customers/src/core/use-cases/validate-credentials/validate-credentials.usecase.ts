import { CompanyCustomerTokenPayload, Err, Ok, Result } from '@ce/shared-core';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { ValidateCredentialsQuery } from './validate-credentials.query';
import { PasswordHasher } from '../../ports/password-hasher';
import { InvalidCredentialsError } from './valide-credentials.errors';

export type ValidateCredentialsResponse = Result<
  CompanyCustomerTokenPayload,
  InvalidCredentialsError
>;

export class ValidateCredentialsUseCase {
  constructor(
    private companyUserRepository: CompanyCustomerRepository,
    private readonly passwordHasher: PasswordHasher
  ) { }

  async execute(
    query: ValidateCredentialsQuery
  ): Promise<ValidateCredentialsResponse> {
    try {
      const companyUser = await this.companyUserRepository.findByEmail(
        query.email
      );

      if (!companyUser) {
        return Err.of(new InvalidCredentialsError());
      }
      const isValid = await this.passwordHasher.compare(
        query.password,
        companyUser.data.password
      );

      if (!isValid) {
        return Err.of(new InvalidCredentialsError());
      }

      return Ok.of({
        id: companyUser.id,
        email: companyUser.email,
        firstname: companyUser.firstname,
        lastname: companyUser.lastname,
        companyId: companyUser.companyId,
        emailVerified: companyUser.emailVerified
      });
    } catch (error) {
      return Err.of(new InvalidCredentialsError());
    }
  }
}
