import { BaseController, BaseResponse, ctrlWrapper, parseBody } from '@ce/server-core';
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

    getAdmin: RequestHandler = (req, res) =>
      ctrlWrapper(this.getIdentifier('getAdmin'), res, async () => {
        let adminId = req.params.adminId;
        const adminResult = await this.adminUsersService.getAdmin(adminId);
  
        if (adminResult.isErr()) {
          throw adminResult.error;
        }
        return {
          status: 200,
          success: true,
          data: adminResult.value.data
        } satisfies BaseResponse;
      });
  
    listAdmins: RequestHandler = (req, res) =>
      ctrlWrapper(this.getIdentifier('listCompanies'), res, async () => {
        const listCompaniesResult = await this.adminUsersService.listAdmins({
          page: parseInt(req.query.page as string),
          limit: parseInt(req.query.limit as string)
        });
        if (listCompaniesResult.isErr()) {
          throw listCompaniesResult.error;
        }
        return {
          status: 200,
          success: true,
          data: listCompaniesResult.value.data
        } satisfies BaseResponse;
      });
}

