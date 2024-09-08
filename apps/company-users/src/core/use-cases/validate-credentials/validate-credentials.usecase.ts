import { CompanyUserTokenPayload, Err, Ok, Result } from '@ce/shared-core';
import { CompanyUserRepository } from '../../ports/company-user.repository';
import { ValidateCredentialsQuery } from './validate-credentials.query';
import { PasswordHasher } from '../../ports/password-hasher';
import { InvalidCredentialsError } from './valide-credentials.errors';
import { CompanyUser } from '../../domain/company-user.entity';

export type ValidateCredentialsResponse = Result<
  CompanyUserTokenPayload,
  InvalidCredentialsError
>;

export class ValidateCredentialsUseCase {
  constructor(
    private companyUserRepository: CompanyUserRepository,
    private readonly passwordHasher: PasswordHasher
  ) { }

  async execute(
    query: ValidateCredentialsQuery
  ): Promise<ValidateCredentialsResponse> {
    const companyUsers = await this.companyUserRepository.findByEmail(
      query.email
    );

    if (!companyUsers) {
      return Err.of(new InvalidCredentialsError());
    }

    let companyUser: CompanyUser | undefined;

    await Promise.all(
      companyUsers.map(async (_companyUser) => {
        const isValid = await this.passwordHasher.compare(
          query.password,
          _companyUser.data.password
        );

        companyUser = isValid ? _companyUser : undefined;
      })
    );

    if (!companyUser) {
      return Err.of(new InvalidCredentialsError());
    }

    return Ok.of({
      id: companyUser.id,
      email: companyUser.email,
      firstname: companyUser.firstname,
      lastname: companyUser.lastname,
      role: companyUser.role,
      companyId: companyUser.companyId,
      emailVerified: companyUser.emailVerified,
    });
  }
}
