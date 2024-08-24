import { BaseResponse, GatewayController, ctrlWrapper } from '@ce/server-core';
import { RequestHandler } from 'express';
import { CompanyUsersService } from './company-users.service';

export class CompanyUsersController extends GatewayController {
  constructor(private readonly companyUsersService: CompanyUsersService) {
    super('companyUsers');
  }

  listCompanyUsers: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listCompanyUsers'), res, async () => {
      const listCompanyUsersResult =
        await this.companyUsersService.listCompanyUsers({
          page: parseInt(req.query.page as string),
          limit: parseInt(req.query.limit as string)
        });
      if (listCompanyUsersResult.isErr()) {
        throw listCompanyUsersResult.error;
      }
      return {
        status: 200,
        success: true,
        data: listCompanyUsersResult.value.data
      } satisfies BaseResponse;
    });

  getCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getCompanyUser'), res, async () => {
      let companyUserId = req.params.companyUserId;
      const companyUserResult =
        await this.companyUsersService.getCompanyUser(companyUserId);

      if (companyUserResult.isErr()) {
        throw companyUserResult.error;
      }
      return {
        status: 200,
        success: true,
        data: companyUserResult.value.data
      } satisfies BaseResponse;
    });
}
