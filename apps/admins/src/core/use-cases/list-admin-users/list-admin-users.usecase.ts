import { Ok } from '@ce/shared-core';
import { AdminRepository } from '../../ports/admin.repository';
import { ListAdminUsersQuery } from './list-admin-users.query';

export class ListAdminUsersUseCase {
  constructor(private readonly adminUserRepository: AdminRepository) {}

  async execute(query: ListAdminUsersQuery) {
    const paginated = await this.adminUserRepository.findAllPaginated(query);

    return Ok.of({
      ...paginated,
      data: paginated.data.map((adminUser) => {
        return {...adminUser.data, password:undefined}
      })
    });
  }
}
