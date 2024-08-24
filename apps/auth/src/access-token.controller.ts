import {
  BadRequestError,
  BaseController,
  BaseResponse,
  UnknownError,
  ctrlWrapper
} from '@ce/server-core';
import { AccessTokenService, InvalidTokenError } from './access-token.service';
import { RequestHandler } from 'express';

export class AccessTokenController extends BaseController {
  constructor(private readonly accessTokenService: AccessTokenService) {
    super('AccessToken');
  }

  create: RequestHandler = async (req, res) =>
    ctrlWrapper('create', res, async () => {
      const result = this.accessTokenService.create(req.body);

      if (result.isErr()) {
        throw new BadRequestError({ message: 'Invalid payload' });
      }

      return {
        success: true,
        data: {
          accessToken: result.value.accessToken,
          refreshToken: result.value.refreshToken
        }
      } satisfies BaseResponse;
    });

  verify: RequestHandler = async (req, res) =>
    ctrlWrapper('verify', res, async () => {
      if (!req.body.token) {
        throw new BadRequestError({ message: 'Token params is required' });
      }
      const result = this.accessTokenService.verify(req.body.token);
      if (result.isErr()) {
        if (result.error instanceof InvalidTokenError) {
          throw new BadRequestError({ message: 'Invalid token' });
        }

        throw new UnknownError();
      }
      return {
        success: true,
        data: {
          payload: result.value
        }
      } satisfies BaseResponse;
    });
}
