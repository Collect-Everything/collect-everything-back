import { Err, Ok } from "@ce/shared-core";
import { CompanyUserRepository } from "../../ports/company-user.repository";
import { UpdateCommand } from "./update.command";

export class UpdateUseCase {
  constructor(private readonly repository: CompanyUserRepository) {}

  async execute(command: UpdateCommand) {
    const companyUser = await this.repository.findById(command.id);

    if (!companyUser) {
      return Err.of(undefined);
    }

    companyUser.update({
      email: command.email,
      firstname: command.firstname,
      lastname: command.lastname,
      role: command.role,
    });

    await this.repository.save(companyUser);

    return Ok.of(undefined);
  }
}
