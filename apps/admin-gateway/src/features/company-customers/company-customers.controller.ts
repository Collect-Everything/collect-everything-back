import { BaseResponse, GatewayController, ctrlWrapper } from '@ce/server-core';
import { RequestHandler } from 'express';
import { CompanyCustomersService } from './company-customers.service';

export class CompanyCustomersController extends GatewayController {
  constructor(private readonly companyUsersService: CompanyCustomersService) {
    super('companycustomers');
  }

  listCompanyCustomers: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listCompanyCustomers'), res, async () => {
      const listCompanyCustomersResult =
        await this.companyUsersService.listCompanyCustomers({
          page: parseInt(req.query.page as string),
          limit: parseInt(req.query.limit as string)
        });
      if (listCompanyCustomersResult.isErr()) {
        throw listCompanyCustomersResult.error;
      }
      return {
        status: 200,
        success: true,
        data: listCompanyCustomersResult.value.data
      } satisfies BaseResponse;
    });

  getCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getCompanyCustomer'), res, async () => {
      let companyCustomerId = req.params.companyCustomerId;

      const companyCustomerResult =
        await this.companyUsersService.getCompanyCustomer(companyCustomerId);

      if (companyCustomerResult.isErr()) {
        throw companyCustomerResult.error;
      }
      return {
        status: 200,
        success: true,
        data: companyCustomerResult.value.data
      } satisfies BaseResponse;
    });
}
