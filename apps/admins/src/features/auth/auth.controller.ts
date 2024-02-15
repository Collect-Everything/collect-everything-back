import { AuthController } from "@ce/server-core";
import { authService } from "./auth.service";
import { AdminRegisterDTO, LoginDTO, RefreshTokenDTO } from "@ce/shared-core";

export const authController = new AuthController({
  name: "admins",
  service: authService,
  loginSchema: LoginDTO,
  registerSchema: AdminRegisterDTO,
  refreshTokenSchema: RefreshTokenDTO,
});
