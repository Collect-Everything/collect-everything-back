import { Err, Ok } from '@ce/shared-core';
import { CompanyUserRepository } from '../../ports/company-user.repository';
import { GetCompanyUserQuery } from './get-company-user.query';
import { CompanyUserNotFoundError } from '../../errors/company-user-not-found';

export class GetCompanyUserUseCase {
  constructor(private companyUserRepository: CompanyUserRepository) {}

  async execute(query: GetCompanyUserQuery) {
    const companyUser = await this.companyUserRepository.findById(query.companyUserId);

    if (!companyUser) {
      return Err.of(new CompanyUserNotFoundError(query.companyUserId));
    }

    return Ok.of({...companyUser.data, password:undefined});
  }
}
