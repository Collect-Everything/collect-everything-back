import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper,
  parseBody
} from '@ce/server-core';
import { RequestHandler } from 'express';
import { CompanyCustomersService } from './company-customers.service';
import { CreateCompanyCustomerDTOSchema } from './dtos/create-company-cutomer.dto';
import { ApiResponse } from '@ce/shared-core';

export class CompanyCustomersController extends GatewayController {
  constructor(
    private readonly companyCustomersService: CompanyCustomersService
  ) {
    super('companyCustomers');
  }

  registerCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('createCompanyCustomer'), res, async () => {
      const body = parseBody(req, CreateCompanyCustomerDTOSchema);
      await this.companyCustomersService.register(body);

      return { success: true, data: {} } satisfies ApiResponse;
    });
}
