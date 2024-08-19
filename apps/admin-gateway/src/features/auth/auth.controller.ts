import {
  BaseController,
  BaseResponse,
  HttpException,
  ctrlWrapper,
} from "@ce/server-core";
import { AuthService } from "./auth.service";
import { RequestHandler } from "express";

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super("auth");
  }

  login: RequestHandler = async (req, res) =>
    ctrlWrapper("login", res, async () => {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HttpException(400, "Email and password are required");
      }

      const res = await this.authService.login(email, password);

      if (res.isErr()) {
        throw new HttpException(400, res.error.message);
      }

      return {
        success: true,
        data: {
          accessToken: res.value.accessToken,
          refreshToken: res.value.refreshToken,
        },
      } satisfies BaseResponse;
    });

  loginWithRefreshToken: RequestHandler = async (req, res) =>
    ctrlWrapper("loginWithRefreshToken", res, async () => {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new HttpException(400, "Refresh token is required");
      }

      const res = await this.authService.loginWithRefreshToken(refreshToken);

      if (res.isErr()) {
        throw new HttpException(400, res.error.message);
      }

      return {
        success: true,
        data: {
          accessToken: res.value.accessToken,
          refreshToken: res.value.refreshToken,
        },
      } satisfies BaseResponse;
    });
}
