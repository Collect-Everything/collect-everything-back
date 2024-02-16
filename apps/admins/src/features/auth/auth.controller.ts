import { AuthController } from "@ce/server-core";
import { authService } from "./auth.service";
import { CreateAdminDto, LoginDto, RefreshTokenDto } from "@ce/shared-core";

export const authController = new AuthController({
  name: "admins",
  service: authService,
  loginSchema: LoginDto,
  registerSchema: CreateAdminDto,
  refreshTokenSchema: RefreshTokenDto,
});
