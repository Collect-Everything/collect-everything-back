import {
  AdminTokenPayload,
  CreateAdminDto,
  LoginDto,
  TokenData,
} from "@ce/shared-core";
import {
  IAuthService,
  comparePasswords,
  errorBuilder,
  hashPassword,
} from "@ce/server-core";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { adminsService } from "../admins/admins.service";
import { AdminModel } from "../admins/admin.model";

class AuthService implements IAuthService {
  constructor() {}

  async login(loginDto: LoginDto) {
    const customer = await adminsService.findByEmail(loginDto.email);

    if (!customer) {
      throw errorBuilder.notFound("User not found");
    }

    const passwordIsValid = await comparePasswords(
      loginDto.password,
      customer.password,
    );

    if (!passwordIsValid) {
      throw errorBuilder.invalidCredentials();
    }

    return this.createToken(customer);
  }

  async register(adminDto: CreateAdminDto) {
    const user = await adminsService.findByEmail(adminDto.email);

    if (user) {
      throw errorBuilder.alreadyExists();
    }

    const hashedPassword = await hashPassword(adminDto.password);
    return adminsService.create({ ...adminDto, password: hashedPassword });
  }

  async refreshToken(token: string) {
    const tokenData = jwt.verify(token, env.jwtSecret) as TokenData;

    if (!tokenData || typeof tokenData === "string" || !tokenData.data) {
      throw errorBuilder.unauthorized();
    }

    const user = await adminsService.get(tokenData.data.sub);

    if (!user) {
      throw errorBuilder.notFound("Admin not found");
    }

    return this.createToken(user);
  }

  private signToken(data: AdminTokenPayload) {
    return jwt.sign({ data }, env.jwtSecret, { expiresIn: "7d" });
  }

  private createToken(user: AdminModel) {
    return this.signToken({
      sub: user.id,
      role: "admin",
    });
  }
}

export const authService = new AuthService();
