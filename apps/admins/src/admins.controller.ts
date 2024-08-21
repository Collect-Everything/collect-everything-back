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
import { RequestHandler } from 'express';
import { EmailAlreadyTakenError } from './core/use-cases/register/register.errors';
import { GetAdminUserUseCase } from './core/use-cases/get-admin-user/get-admin-user.usecase';
import { ListAdminUsersUseCase } from './core/use-cases/list-admin-users/list-admin-users.usecase';
import { ValidateCredentialsUseCase } from './core/use-cases/validate-credentials/validate-credentials.usecase';
import { RegisterUseCase } from './core/use-cases/register/register.usecase';
import { RegisterCommand } from './core/use-cases/register/register.command';
import { ApiResponse } from '@ce/shared-core';
import { AdminNotFoundError } from './core/errors/admin-not-found';

export class AdminController extends BaseController {
  constructor(
    private readonly getAdminUserUseCase: GetAdminUserUseCase,
    private readonly listAdminUsersUseCase: ListAdminUsersUseCase,
    private readonly validateCredentialsUseCase: ValidateCredentialsUseCase,
    private readonly registerUseCase: RegisterUseCase
  ) {
    super('Admin');
  }

  getAdminUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getAdminUser'), res, async () => {
      const { adminId } = req.params;
      if (!adminId) {
        throw new BadRequestError({ message: 'Missing adminId' });
      }
      const result = await this.getAdminUserUseCase.execute({
        adminId
      });
      if (result.isErr()) {
        if (result.error instanceof AdminNotFoundError) {
          throw new NotFoundError({
            message: `AdminUser ${adminId} not found`
          });
        }
        throw new UnknownError();
      }

      return {
        success: true,
        data: { result }
      } satisfies ApiResponse;
    });

  listAdminUsers: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listAdminUsers'), res, async () => {
      const query = req.query;

      const result = await this.listAdminUsersUseCase.execute({
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
}
