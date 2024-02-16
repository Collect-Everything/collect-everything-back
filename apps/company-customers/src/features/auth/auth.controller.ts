import { AuthController } from "@ce/server-core";
import { authService } from "./auth.service";
import {
  CreateCompanyCustomerDto,
  LoginDto,
  RefreshTokenDto,
} from "@ce/shared-core";

export const authController = new AuthController({
  name: "company-customers",
  service: authService,
  loginSchema: LoginDto,
  registerSchema: CreateCompanyCustomerDto,
  refreshTokenSchema: RefreshTokenDto,
});
