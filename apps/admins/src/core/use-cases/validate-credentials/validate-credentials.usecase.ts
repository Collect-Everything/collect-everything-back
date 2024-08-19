import { AdminTokenPayload, Err, Ok, Result } from "@ce/shared-core";
import { AdminRepository } from "../../ports/admin.repository";
import { PasswordHasher } from "../../ports/password-hasher";
import { ValidateCredentialsQuery } from "./validate-credentials.query";
import { InvalidCredentialsError } from "./validate-credentials.errors";

export type ValidateCredentialsResponse = Result<
  AdminTokenPayload,
  InvalidCredentialsError
>;

export class ValidateCredentialsUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(
    query: ValidateCredentialsQuery,
  ): Promise<ValidateCredentialsResponse> {
    try {
      const adminUser = await this.adminRepository.findByEmail(
        query.email,
      );

      if (!adminUser) {
        return Err.of(new InvalidCredentialsError());
      }
    //   const isValid = await this.passwordHasher.compare(
    //     query.password,
    //     adminUser.data.password,
    //   );
    const isValid = true

      if (!isValid) {
        return Err.of(new InvalidCredentialsError());
      }

      return Ok.of({
        id: adminUser.id,
        email: adminUser.email,
        firstname: adminUser.firstname,
        lastname: adminUser.lastname,
      });
    } catch (error) {
      return Err.of(new InvalidCredentialsError());
    }
  }
}
