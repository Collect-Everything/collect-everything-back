import { RequestHandler } from "express";
import { authService } from "./auth.service";
import { ctrlWrapper, parseBody } from "@ce/server-core";
import {
  ApiResponse,
  LoginSchema,
  RefreshTokenSchema,
  RegisterDTO,
  registerSchema,
} from "@ce/shared-core";

class AuthController {
  private service = authService;

  constructor() {}

  login: RequestHandler = (req, res) =>
    ctrlWrapper("login", res, async () => {
      const loginDto = parseBody(req, LoginSchema);

      const user = await this.service.validate(loginDto);

      const session = await this.service.login(user);
      return {
        success: true,
        data: { id: session._id, session },
      } satisfies ApiResponse;
    });

  register: RequestHandler = (req, res) =>
    ctrlWrapper("register", res, async () => {
      const registerDto = parseBody(req, RegisterDTO);
      const type = registerDto.type;
      const data = registerSchema[type].parse(registerDto.data);
      return {
        success: true,
        data: await this.service.register(registerDto),
      } satisfies ApiResponse;
    });

  refreshToken: RequestHandler = (req, res) =>
    ctrlWrapper("refreshToken", res, async () => {
      const refreshTokenDto = parseBody(req, RefreshTokenSchema);
      return {
        success: true,
        data: await this.service.refreshToken(refreshTokenDto),
      } satisfies ApiResponse;
    });
}

export const authController = new AuthController();
