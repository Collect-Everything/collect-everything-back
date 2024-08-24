import {
  BadRequestError,
  BaseController,
  BaseResponse,
  ConflictError,
  NotFoundError,
  UnknownError,
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

      if (!companyCustomerId) {
        throw new BadRequestError({ message: 'Missing companyCustomerId' });
      }
      const result = await this.getCompanyCustomerUseCase.execute({
        companyCustomerId
      });
      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new NotFoundError({
            message: `CompanyCustomer ${companyCustomerId} not found`
          });
        }
        throw new UnknownError();
      }

      return {
        success: true,
        data: { result }
      } satisfies ApiResponse;
    });

  listCompanyCustomers: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listCompanyCustomers'), res, async () => {
      const query = req.query;
      const result = await this.listCompanyCustomersUseCase.execute({
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

  register: RequestHandler = async (req, res) =>
    ctrlWrapper('register', res, async () => {
      const body = req.body as RegisterCommand;

      const result = await this.registerUseCase.execute(body);

      if (result.isErr()) {
        if (result.error instanceof EmailAlreadyTakenError) {
          throw new ConflictError({ message: 'Email already taken' });
        }

        throw new UnknownError();
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
        throw new BadRequestError({ message: 'Email is required' });
      }

      const result = await this.validateEmailUseCase.execute({ email });

      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new NotFoundError({ message: 'Company user not found' });
        }

        if (result.error instanceof EmailAlreadyVerifiedError) {
          throw new ConflictError({ message: 'Email already verified' });
        }

        throw new UnknownError();
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
        throw new BadRequestError({
          message: 'Email and password are required'
        });
      }
      const result = await this.validateCredentialsUseCase.execute({
        email,
        password
      });
      if (result.isErr()) {
        throw new BadRequestError({ message: 'Invalid credentials' });
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
        throw new BadRequestError({ message: 'Id is required' });
      }
      const result = await this.updateUseCase.execute({ id, ...body });
      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new NotFoundError({ message: 'Company user not found' });
        }
        throw new UnknownError();
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
        throw new BadRequestError({ message: 'Id is required' });
      }
      const result = await this.deleteUseCase.execute({ id });
      if (result.isErr()) {
        if (result.error instanceof CompanyCustomerNotFoundError) {
          throw new NotFoundError({ message: 'Company user not found' });
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
