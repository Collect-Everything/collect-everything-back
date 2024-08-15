import { BaseController } from "@ce/server-core";
import { AuthService } from "./auth.service";

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super("auth");
  }
}
