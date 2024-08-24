import { RequestHandler } from 'express';
import {
  BadRequestError,
  BaseController,
  BaseResponse,
  ConflictError,
  NotFoundError,
  UnknownError,
  ctrlWrapper
} from '@ce/server-core';
import { CreateCompanyUseCase } from './core/use-cases/create-company/create-company.usecase';
import { ConfigureStoreUseCase } from './core/use-cases/configure-store/configure-store.usecase';
import { CompanyAlreadyExistsError } from './core/use-cases/create-company/create-company.errors';
import { StoreNameAlreadyExistsError } from './core/use-cases/configure-store/configure-store.errors';
import { CompanyNotFoundError } from './core/errors/company-not-found';
import { GetCompanyUseCase } from './core/use-cases/get-company/get-company.usecase';
import { ListCompaniesUseCase } from './core/use-cases/list-companies/list-companies.usecase';
import { GetStoreConfigurationUseCase } from './core/use-cases/get-store-configuration/get-store-configuration.usecase';
import { CreateCompanyDTO } from '@ce/shared-core';
import { DeleteCompanyUseCase } from './core/use-cases/delete-company/delete-company.usecase';

export class CompanyController extends BaseController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private configureStoreUseCase: ConfigureStoreUseCase,
    private getCompanyUseCase: GetCompanyUseCase,
    private listCompaniesUeCase: ListCompaniesUseCase,
    private getStoreConfigurationUseCase: GetStoreConfigurationUseCase,
    private deleteCompanyUseCase: DeleteCompanyUseCase
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
        status: 201,
        success: true,
        data: result.value
      } satisfies BaseResponse;
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
        status: 200,
        success: true,
        data: {}
      } satisfies BaseResponse;
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
        status: 200,
        success: true,
        data: { result }
      } satisfies BaseResponse;
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
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
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
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
    });

  deleteCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('deleteCompany'), res, async () => {
      const { companyId } = req.params;
      if (!companyId) {
        throw new BadRequestError({ message: 'Missing companyId params' });
      }
      const result = await this.deleteCompanyUseCase.execute({ companyId });
      if (result.isErr()) {
        if (result.error instanceof CompanyNotFoundError) {
          throw new NotFoundError({
            message: `Company ${companyId} not found`
          });
        }
        throw new UnknownError();
      }
      return {
        status: 200,
        success: true,
        data: {}
      } satisfies BaseResponse;
    });
}
