import { Err, Ok, Result } from "@ce/shared-core";
import { RegisterCommand } from "./register.command";
import { CompanyUserRepository } from "../../ports/company-user.repository";
import { IdProvider } from "../../ports/id-provider";
import { CompanyUser } from "../../domain/company-user.entity";
import { PasswordHasher } from "../../ports/password-hasher";
import { EmailAlreadyTakenError } from "./register.errors";

export class RegisterUseCase {
  constructor(
    private readonly companyUserRepository: CompanyUserRepository,
    private readonly idProvider: IdProvider,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(command: RegisterCommand): Promise<Result<void, any>> {
    try {
      const exists = await this.companyUserRepository.findByEmail(
        command.email,
      );

      if (exists) {
        return Err.of(new EmailAlreadyTakenError());
      }

      const companyUser = CompanyUser.fromData({
        id: this.idProvider.generate(),
        email: command.email,
        password: await this.passwordHasher.hash(command.password),
        firstname: command.firstname,
        lastname: command.lastname,
        companyId: command.companyId,
        role: command.role,
      });

      await this.companyUserRepository.save(companyUser);

      return Ok.of(undefined);
    } catch (error) {
      return Err.of(error);
    }
  }
}
