import { Err, Ok } from '@ce/shared-core';
import { CompanyUserRepository } from '../../ports/company-user.repository';
import { DeleteCommand } from './delete.command';
import { CompanyUserNotFoundError } from '../../errors/company-user-not-found';
import { LastAdminError } from './delete.errors';

export class DeleteUseCase {
  constructor(private readonly companyUserRepository: CompanyUserRepository) {}

  async execute(command: DeleteCommand) {
    const companyUser = await this.companyUserRepository.findById(command.id);

    if (!companyUser) {
      return Err.of(new CompanyUserNotFoundError(command.id));
    }

    if (companyUser.role === 'ADMIN') {
      const adminCount = await this.companyUserRepository.countAdminsForCompany(
        companyUser.companyId
      );

      if (adminCount <= 1) {
        return Err.of(new LastAdminError());
      }
    }

    await this.companyUserRepository.delete(command.id);
    return Ok.of(undefined);
  }
}
