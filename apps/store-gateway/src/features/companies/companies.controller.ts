import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper
} from '@ce/server-core';
import { CompaniesService } from './companies.service';
import { RequestHandler } from 'express';
import { ProductsService } from '../products/products.service';

export class CompaniesController extends GatewayController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly productsService: ProductsService
  ) {
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

  getCompanyData: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getCompanyData'), res, async () => {
      const { companySlug } = req.params;
      if (!companySlug) {
        throw new HttpException(400, 'companyId is required');
      }

      const company = await this.companiesService.getBySlug(companySlug);

      if (company.isErr()) {
        const err = company.error;
        throw err;
      }

      const storeConfiguration =
        await this.companiesService.getStoreConfiguration(
          company.value.data.id
        );

      if (storeConfiguration.isErr()) {
        const err = storeConfiguration.error;
        throw err;
      }

      const products = await this.productsService.listProducts(
        company.value.data.id,
        {
          page: 1,
          limit: 99
        }
      );

      if (products.isErr()) {
        const err = products.error;
        throw err;
      }

      return {
        status: 200,
        success: true,
        data: {
          ...storeConfiguration.value.data,
          products: products.value.data.data
        }
      } satisfies BaseResponse;
    });
}
