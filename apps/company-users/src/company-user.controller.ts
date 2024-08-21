import {
  BadRequestError,
  BaseController,
  BaseResponse,
  ConflictError,
  HttpException,
  NotFoundError,
  UnknownError,
  ctrlWrapper
} from '@ce/server-core';
import { RegisterUseCase } from './core/use-cases/register/register.usecase';
import { RequestHandler } from 'express';
import { RegisterCommand } from './core/use-cases/register/register.command';
import { EmailAlreadyTakenError } from './core/use-cases/register/register.errors';
import { ValidateEmailUseCase } from './core/use-cases/validate-email/validate-email.usecase';
import { EmailAlreadyVerifiedError } from './core/use-cases/validate-email/validate-email.errors';
import { ValidateCredentialsUseCase } from './core/use-cases/validate-credentials/validate-credentials.usecase';
import { GetCompanyUserUseCase } from './core/use-cases/get-company-user/get-company-user.usecase';
import { ListCompanyUsersUseCase } from './core/use-cases/list-company-users/list-company-users.usecase';
import { UpdateUseCase } from './core/use-cases/update/update.usecase';
import { CompanyUserNotFoundError } from './core/errors/company-user-not-found';
import { DeleteUseCase } from './core/use-cases/delete/delete.usecase';
import { ApiResponse } from '@ce/shared-core';

export class CompanyUserController extends BaseController {
  constructor(
    private readonly getCompanyUserUseCase: GetCompanyUserUseCase,
    private readonly listCompanyUsersUseCase: ListCompanyUsersUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly validateEmailUseCase: ValidateEmailUseCase,
    private readonly validateCredentialsUseCase: ValidateCredentialsUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) {
    super('CompanyUser');
  }

  getCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getCompanyUser'), res, async () => {
      const { companyUserId } = req.params;
      if (!companyUserId) {
        throw new BadRequestError({ message: 'Missing companyUserId' });
      }
      const result = await this.getCompanyUserUseCase.execute({
        companyUserId
      });
      if (result.isErr()) {
        if (result.error instanceof CompanyUserNotFoundError) {
          throw new NotFoundError({
            message: `CompanyUser ${companyUserId} not found`
          });
        }
        throw new UnknownError();
      }

      return {
        success: true,
        data: { result }
      } satisfies ApiResponse;
    });

  listCompanyUsers: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listCompanyUsers'), res, async () => {
      const query = req.query;

      const result = await this.listCompanyUsersUseCase.execute({
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
        if (result.error instanceof CompanyUserNotFoundError) {
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
        if (result.error instanceof CompanyUserNotFoundError) {
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
        if (result.error instanceof CompanyUserNotFoundError) {
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
