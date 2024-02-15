import { AuthController } from "@ce/server-core";
import { authService } from "./auth.service";
import {
  CompanyUserRegisterDTO,
  LoginDTO,
  RefreshTokenDTO,
} from "@ce/shared-core";

export const authController = new AuthController({
  name: "company-users",
  service: authService,
  loginSchema: LoginDTO,
  registerSchema: CompanyUserRegisterDTO,
  refreshTokenSchema: RefreshTokenDTO,
});
