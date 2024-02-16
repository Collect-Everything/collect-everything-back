import { AuthController } from "@ce/server-core";
import { authService } from "./auth.service";
import {
  CreateCompanyUserDto,
  LoginDto,
  RefreshTokenDto,
} from "@ce/shared-core";

export const authController = new AuthController({
  name: "company-users",
  service: authService,
  loginSchema: LoginDto,
  registerSchema: CreateCompanyUserDto,
  refreshTokenSchema: RefreshTokenDto,
});
