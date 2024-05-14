import { Ok, Result } from "@ce/shared-core";
import { CompanyRepository } from "../../ports/company.repository";
import { ConfigureStoreCommand } from "./configure-store.command";

export class ConfigureStoreUseCase {
  constructor(companyRepository: CompanyRepository) {}

  async execute(command: ConfigureStoreCommand): Promise<Result<void, Error>> {
    return Ok.of(undefined);
  }
}
