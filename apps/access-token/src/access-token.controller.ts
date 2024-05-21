import {
  BaseController,
  BaseResponse,
  HttpException,
  ctrlWrapper,
} from "@ce/server-core";
import { AccessTokenService, InvalidTokenError } from "./access-token.service";
import { RequestHandler } from "express";

export class AccessTokenController extends BaseController {
  constructor(private readonly accessTokenService: AccessTokenService) {
    super("AccessToken");
  }

  create: RequestHandler = async (req, res) =>
    ctrlWrapper("create", res, async () => {
      const result = this.accessTokenService.create(req.body);

      if (result.isErr()) {
        throw new HttpException(400, "Invalid payload", result.error);
      }

      return {
        success: true,
        data: result.value,
      } satisfies BaseResponse;
    });

  verify: RequestHandler = async (req, res) =>
    ctrlWrapper("verify", res, async () => {
      if (!req.body.token) {
        throw new HttpException(400, "Token is required");
      }
      const result = this.accessTokenService.verify(req.body.token);
      if (result.isErr()) {
        if (result.error instanceof InvalidTokenError) {
          throw new HttpException(400, "Invalid token");
        }

        throw new HttpException(500, "Internal server error", result.error);
      }
      return {
        success: true,
        data: result.value,
      } satisfies BaseResponse;
    });
}
