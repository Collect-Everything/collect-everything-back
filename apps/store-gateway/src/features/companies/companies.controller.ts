import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper,
  parseBody
} from '@ce/server-core';
import { CompaniesService } from './companies.service';
import { RequestHandler } from 'express';

export class CompaniesController extends GatewayController {
  constructor(private readonly companiesService: CompaniesService) {
    super('companies');
  }

  getCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getCompany'), res, async () => {
      const { companyId } = req.params;
      if (!companyId) {
        throw new HttpException(400, 'companyId is required to get company');
      }
      const getCompanyResult = await this.companiesService.getCompany(
        companyId as string
      );
      if (getCompanyResult.isErr()) {
        throw new HttpException(400, getCompanyResult.error.message);
      }
      return {
        status: 200,
        success: true,
        data: getCompanyResult.value.data
      } satisfies BaseResponse;
    });
}
