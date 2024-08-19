import { Err, Ok, Result } from "@ce/shared-core";
import { RegisterCommand } from "./register.command";
import { AdminRepository } from "../../ports/admin.repository";
import { IdProvider } from "../../ports/id-provider";
import { Admin } from "../../domain/admin.entity";
import { PasswordHasher } from "../../ports/password-hasher";
import { EmailAlreadyTakenError } from "./register.errors";

export class RegisterUseCase {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly idProvider: IdProvider,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(command: RegisterCommand): Promise<Result<void, any>> {
    try {
      const exists = await this.adminRepository.findByEmail(
        command.email,
      );

      if (exists) {
        return Err.of(new EmailAlreadyTakenError());
      }

      const admin = Admin.fromData({
        id: this.idProvider.generate(),
        email: command.email,
        password: await this.passwordHasher.hash(command.password),
        firstname: command.firstname,
        lastname: command.lastname,
      });

      await this.adminRepository.save(admin);

      return Ok.of(undefined);
    } catch (error) {
      return Err.of(error);
    }
  }
}
