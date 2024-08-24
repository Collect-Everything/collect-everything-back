import { Err, Ok } from '@ce/shared-core';
import { AdminRepository } from '../../ports/admin.repository';
import { GetAdminUserQuery } from './get-admin-user.query';
import { AdminNotFoundError } from '../../errors/admin-not-found';

export class GetAdminUserUseCase {
  constructor(private adminUserRepository: AdminRepository) {}

  async execute(query: GetAdminUserQuery) {
    const adminUser = await this.adminUserRepository.findById(query.adminId);

    if (!adminUser) {
      return Err.of(new AdminNotFoundError(query.adminId));
    }

    return Ok.of({...adminUser.data, password:undefined});
  }
}
