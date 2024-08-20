import { Ok } from '@ce/shared-core';
import { CompanyUserRepository } from '../../ports/company-user.repository';
import { ListCompanyUsersQuery } from './list-company-users.query';

export class ListCompanyUsersUseCase {
  constructor(private readonly companyuserRepository: CompanyUserRepository) {}

  async execute(query: ListCompanyUsersQuery) {
    const paginated = await this.companyuserRepository.findAllPaginated(query);

    return Ok.of({
      ...paginated,
      data: paginated.data.map((companyUser) => {
        return {...companyUser.data, password:undefined}
      })
    });
  }
}
