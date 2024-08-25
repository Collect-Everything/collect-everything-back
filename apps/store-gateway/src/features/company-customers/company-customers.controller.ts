import {
  BadRequestError,
  BaseResponse,
  GatewayController,
  ctrlWrapper,
  parseBody
} from '@ce/server-core';
import { RequestHandler } from 'express';
import { CompanyCustomersService } from './company-customers.service';
import { CreateCompanyCustomerDTOSchema } from './dtos/create-company-cutomer.dto';
import {
  UpdateCompanyCustomerDTO,
  UpdateCompanyCustomerDTOSchema
} from './dtos/update-company-customer.dto';
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

  updateCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('updateCompanyCustomer'), res, async () => {
      const { companyCustomerId } = req.params;
      if (!companyCustomerId) {
        throw new BadRequestError({ message: 'companyCustomerId is required' });
      }
      const body = parseBody<UpdateCompanyCustomerDTO>(
        req,
        UpdateCompanyCustomerDTOSchema
      );
      const updateCompanyCustomerResult =
        await this.companyCustomersService.updateCompanyCustomer(
          companyCustomerId as string,
          body
        );
      if (updateCompanyCustomerResult.isErr()) {
        throw updateCompanyCustomerResult.error;
      }
      return {
        status: 200,
        success: true,
        data: updateCompanyCustomerResult.value.data
      } satisfies BaseResponse;
    });

  deleteCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('deleteCompanyCustomer'), res, async () => {
      const { companyCustomerId } = req.params;
      if (!companyCustomerId) {
        throw new BadRequestError({ message: 'companyCustomerId is required' });
      }
      const deleteCompanyCustomerResult =
        await this.companyCustomersService.deleteCompanyCustomer(
          companyCustomerId as string
        );
      if (deleteCompanyCustomerResult.isErr()) {
        throw deleteCompanyCustomerResult.error;
      }
      return {
        status: 200,
        success: true,
        data: deleteCompanyCustomerResult.value.data
      } satisfies BaseResponse;
    });
}
