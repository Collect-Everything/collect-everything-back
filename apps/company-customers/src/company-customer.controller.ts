import {
  BaseController,
  BaseResponse,
  HttpException,
  ctrlWrapper
} from '@ce/server-core';
import { GetCompanyCustomerUseCase } from './core/use-cases/get-company-customer/get-company-customer.usecase';
import { ListCompanyCustomersUseCase } from './core/use-cases/list-company-customers/list-company-customers.usecase';
import { RegisterUseCase } from './core/use-cases/register/register.usecase';
import { RequestHandler } from 'express';
import { RegisterCommand } from './core/use-cases/register/register.command';
import { EmailAlreadyTakenError } from './core/use-cases/register/register.errors';
import { ValidateEmailUseCase } from './core/use-cases/validate-email/validate-email.usecase';
import { EmailAlreadyVerifiedError } from './core/use-cases/validate-email/validate-email.errors';
import { ValidateCredentialsUseCase } from './core/use-cases/validate-credentials/validate-credentials.usecase';
import { UpdateUseCase } from './core/use-cases/update/update.usecase';
import { CompanyCustomerNotFoundError } from './core/errors/company-customer-not-found';
import { DeleteUseCase } from './core/use-cases/delete/delete.usecase';
import { ApiResponse } from '@ce/shared-core';

export class CompanyCustomerController extends BaseController {
  constructor(
    private readonly getCompanyCustomerUseCase: GetCompanyCustomerUseCase,
    private readonly listCompanyCustomersUseCase: ListCompanyCustomersUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly validateEmailUseCase: ValidateEmailUseCase,
    private readonly validateCredentialsUseCase: ValidateCredentialsUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) {
    super('CompanyCustomer');
  }
  
  getCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getCompanyCustomer'), res, async () => {
      const { companyCustomerId } = req.params;

      console.log(companyCustomerId)

      if (!companyCustomerId) {
        throw new HttpException(400, 'Missing companyCustomerId');
      }
      const result = await this.getCompanyCustomerUseCase.execute({ companyCustomerId });
      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new HttpException(404, `CompanyCustomer ${companyCustomerId} not found`);
        }
        throw new HttpException(500, 'Unknown error', [result.error]);
      }

      return {
        success: true,
        data: {result}
      } satisfies ApiResponse;
    });

  listCompanyCustomers: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listCompanyCustomers'), res, async () => {
      const query = req.query;
      console.log('query', query);
      const result = await this.listCompanyCustomersUseCase.execute({
        limit: parseInt(query.limit as string),
        page: parseInt(query.page as string)
      });

      if (result.isErr()) {
        throw new HttpException(500, 'Unknown error', [result.error]);
      }

      return {
        success: true,
        data: result.value
      } satisfies ApiResponse;
    });

  register: RequestHandler = async (req, res) =>
    ctrlWrapper('register', res, async () => {
      const body = req.body as RegisterCommand;

      const result = await this.registerUseCase.execute(body);

      if (result.isErr()) {
        if (result.error instanceof EmailAlreadyTakenError) {
          throw new HttpException(400, 'Email already taken');
        }

        throw new HttpException(500, 'Internal server error', result.error);
      }

      return {
        status: 201,
        success: true,
        data: {}
      } satisfies BaseResponse;
    });

  validateEmail: RequestHandler = async (req, res) =>
    ctrlWrapper('validateEmail', res, async () => {
      const email = req.body.email;

      if (!email) {
        throw new HttpException(400, 'Email is required');
      }

      const result = await this.validateEmailUseCase.execute({ email });

      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new HttpException(404, 'Company user not found');
        }

        if (result.error instanceof EmailAlreadyVerifiedError) {
          throw new HttpException(400, 'Email already verified');
        }

        throw new HttpException(500, 'Internal server error', [result.error]);
      }

      return {
        status: 200,
        success: true,
        data: {}
      } satisfies BaseResponse;
    });

  validateCredentials: RequestHandler = async (req, res) =>
    ctrlWrapper('validateCredentials', res, async () => {
      const email = req.body.email;
      const password = req.body.password;
      if (!email || !password) {
        throw new HttpException(400, 'Email and password are required');
      }
      const result = await this.validateCredentialsUseCase.execute({
        email,
        password
      });
      if (result.isErr()) {
        throw new HttpException(401, 'Invalid credentials');
      }
      return {
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
    });

  update: RequestHandler = async (req, res) =>
    ctrlWrapper('update', res, async () => {
      const id = req.params.id;
      const body = req.body;
      if (!id) {
        throw new HttpException(400, 'Id is required');
      }
      const result = await this.updateUseCase.execute({ id, ...body });
      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new HttpException(404, 'Company user not found');
        }
        throw new HttpException(500, 'Internal server error', [result.error]);
      }
      return {
        status: 200,
        success: true,
        data: {}
      } satisfies BaseResponse;
    });

  delete: RequestHandler = async (req, res) =>
    ctrlWrapper('delete', res, async () => {
      const id = req.params.id;
      if (!id) {
        throw new HttpException(400, 'Id is required');
      }
      const result = await this.deleteUseCase.execute({ id });
      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new HttpException(404, 'Company user not found');
        }
        throw new HttpException(500, 'Internal server error', [result.error]);
      }
      return {
        status: 200,
        success: true,
        data: {}
      } satisfies BaseResponse;
    });
}
