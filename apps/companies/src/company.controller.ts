import { RequestHandler } from 'express';
import {
  BadRequestError,
  BaseController,
  ConflictError,
  NotFoundError,
  UnknownError,
  ctrlWrapper
} from '@ce/server-core';
import { ApiResponse, CreateCompanyDTO } from '@ce/shared-core';
import { CreateCompanyUseCase } from './core/use-cases/create-company/create-company.usecase';
import { ConfigureStoreUseCase } from './core/use-cases/configure-store/configure-store.usecase';
import { CompanyAlreadyExistsError } from './core/use-cases/create-company/create-company.errors';
import { StoreNameAlreadyExistsError } from './core/use-cases/configure-store/configure-store.errors';
import { CompanyNotFoundError } from './core/errors/company-not-found';
import { GetCompanyUseCase } from './core/use-cases/get-company/get-company.usecase';
import { ListCompaniesUseCase } from './core/use-cases/list-companies/list-companies.usecase';
import { GetStoreConfigurationUseCase } from './core/use-cases/get-store-configuration/get-store-configuration.usecase';

export class CompanyController extends BaseController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private configureStoreUseCase: ConfigureStoreUseCase,
    private getCompanyUseCase: GetCompanyUseCase,
    private listCompaniesUeCase: ListCompaniesUseCase,
    private getStoreConfigurationUseCase: GetStoreConfigurationUseCase
  ) {
    super('CompanyController');
  }

  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('createCompany'), res, async () => {
      const body = req.body as CreateCompanyDTO;

      const result = await this.createCompanyUseCase.execute(body);

      if (result.isErr()) {
        if (result.error instanceof CompanyAlreadyExistsError) {
          throw new ConflictError({ message: result.error.message });
        }

        throw new UnknownError();
      }

      return {
        success: true,
        data: { companyId: result.value.id }
      } satisfies ApiResponse;
    });

  configureStore: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('configureStore'), res, async () => {
      const { companyId } = req.params;
      const body = req.body;

      if (!companyId) {
        throw new BadRequestError({ message: 'Missing companyId params' });
      }

      const result = await this.configureStoreUseCase.execute({
        companyId,
        ...body
      });
      if (result.isErr()) {
        if (result.error instanceof StoreNameAlreadyExistsError) {
          throw new BadRequestError({ message: 'Store name already exists' });
        }
        if (result.error instanceof CompanyNotFoundError) {
          throw new NotFoundError({
            message: `Company ${companyId} not found`
          });
        }
        throw new UnknownError();
      }
      return {
        success: true,
        data: {}
      } satisfies ApiResponse;
    });

  getCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getCompany'), res, async () => {
      const { companyId } = req.params;
      if (!companyId) {
        throw new BadRequestError({ message: 'Missing companyId params' });
      }
      const result = await this.getCompanyUseCase.execute({ companyId });
      if (result.isErr()) {
        if (result.error instanceof CompanyNotFoundError) {
          throw new NotFoundError({
            message: `Company ${companyId} not found`
          });
        }
        throw new UnknownError();
      }

      return {
        success: true,
        data: { result }
      } satisfies ApiResponse;
    });

  listCompanies: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listCompanies'), res, async () => {
      const query = req.query;
      console.log('query', query);
      const result = await this.listCompaniesUeCase.execute({
        limit: parseInt(query.limit as string),
        page: parseInt(query.page as string)
      });

      if (result.isErr()) {
        throw new UnknownError();
      }

      return {
        success: true,
        data: result.value
      } satisfies ApiResponse;
    });

  getStoreConfiguration: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getStoreConfiguration'), res, async () => {
      const { storeSlug } = req.params;
      if (!storeSlug) {
        throw new BadRequestError({ message: 'Missing storeSlug params' });
      }
      const result = await this.getStoreConfigurationUseCase.execute({
        storeSlug
      });
      if (result.isErr()) {
        if (result.error instanceof CompanyNotFoundError) {
          throw new NotFoundError({
            message: `Company ${storeSlug} not found`
          });
        }
        throw new UnknownError();
      }
      return {
        success: true,
        data: result.value
      } satisfies ApiResponse;
    });
}
