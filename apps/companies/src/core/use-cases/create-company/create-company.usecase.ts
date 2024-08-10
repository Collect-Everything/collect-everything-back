import { Err, Ok } from "@ce/shared-core";
import { Company } from "../../domain/company.entity";
import { CompanyRepository } from "../../ports/company.repository";
import { IDProvider } from "../../ports/id-provider";
import { CreateCompanyCommand } from "./create-company.command";
import { CompanyAlreadyExistsError } from "./create-company.errors";

export class CreateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly idProvider: IDProvider,
  ) {}

  async execute(command: CreateCompanyCommand) {
    try {
      const exists = await this.companyRepository.findByNameOrEmail(
        command.name,
        command.email,
      );

      if (exists) {
        return Err.of(new CompanyAlreadyExistsError());
      }
      const company = Company.fromData({
        id: this.idProvider.generate(),
        ...command,
        subscriptionStatus: "FREE_TRIAL",
      });

      await this.companyRepository.save(company);

      return Ok.of({ id: company.id });
    } catch (error) {
      return Err.of(error);
    }
  }
}
