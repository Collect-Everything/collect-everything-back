import { BaseController, ctrlWrapper, parseBody } from '@ce/server-core';
import { RequestHandler } from 'express';
import { ApiResponse, CreateAdminDto } from '@ce/shared-core';
import { AdminUsersService } from './admin-users.service';

export class AdminUserController extends BaseController {
  constructor(private readonly adminUsersService: AdminUsersService) {
    super('admin');
  }

  registerAdmin: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('register'), res, async () => {
      const body = parseBody(req, CreateAdminDto);
      const result = await this.adminUsersService.register(body);

      if (result.isErr()) {
        throw result.error;
      }

      return { success: true, data: {} } satisfies ApiResponse;
    });
}

