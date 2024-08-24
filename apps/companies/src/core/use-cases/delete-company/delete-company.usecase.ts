import { Err, Ok } from '@ce/shared-core';
import { CompanyRepository } from '../../ports/company.repository';
import { DeleteCompanyCommand } from './delete-company.command';
import { CompanyNotFoundError } from '../../errors/company-not-found';

export class DeleteCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(command: DeleteCompanyCommand) {
    const company = await this.companyRepository.findById(command.companyId);

    if (!company) {
      return Err.of(new CompanyNotFoundError(command.companyId));
    }

    await this.companyRepository.delete(command.companyId);

    return Ok.of(undefined);
  }
}
