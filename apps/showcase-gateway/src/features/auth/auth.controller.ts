import {
  BadRequestError,
  BaseController,
  BaseResponse,
  BodyValidationError,
  HttpException,
  ctrlWrapper
} from '@ce/server-core';
import { AuthService } from './auth.service';
import { RequestHandler } from 'express';

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super('auth');
  }

  login: RequestHandler = async (req, res) =>
    ctrlWrapper('login', res, async () => {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BodyValidationError({
          message: 'Email and password are required'
        });
      }

      const res = await this.authService.login(email, password);

      if (res.isErr()) {
        throw res.error;
      }

      return {
        success: true,
        data: res.value
      } satisfies BaseResponse;
    });

  loginWithRefreshToken: RequestHandler = async (req, res) =>
    ctrlWrapper('loginWithRefreshToken', res, async () => {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new BadRequestError({ message: 'Refresh token is required' });
      }

      const res = await this.authService.loginWithRefreshToken(refreshToken);

      if (res.isErr()) {
        throw res.error;
      }

      return {
        success: true,
        data: res.value
      } satisfies BaseResponse;
    });
}
