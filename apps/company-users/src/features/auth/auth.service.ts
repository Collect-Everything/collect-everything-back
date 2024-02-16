import {
  CompanyUserRegisterDTO,
  CompanyUserTokenPayload,
  LoginDTO,
  TokenData,
} from "@ce/shared-core";
import { companyUsersService } from "../company-users/company-users.service";
import {
  IAuthService,
  comparePasswords,
  errorBuilder,
  hashPassword,
} from "@ce/server-core";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { CompanyUserModel } from "../company-users/company-user.model";

class AuthService implements IAuthService {
  constructor() {}

  async login(loginDTO: LoginDTO) {
    const customer = await companyUsersService.findByEmail(loginDTO.email);

    if (!customer) {
      throw errorBuilder.notFound("User not found");
    }

    const passwordIsValid = await comparePasswords(
      loginDTO.password,
      customer.password,
    );

    if (!passwordIsValid) {
      throw errorBuilder.invalidCredentials();
    }

    return this.createToken(customer);
  }

  async register(userDTO: CompanyUserRegisterDTO) {
    const user = await companyUsersService.findByEmail(userDTO.email);

    if (user) {
      throw errorBuilder.alreadyExists();
    }

    const hashedPassword = await hashPassword(userDTO.password);
    return companyUsersService.create({ ...userDTO, password: hashedPassword });
  }

  async refreshToken(token: string) {
    const tokenData = jwt.verify(token, env.jwtSecret) as TokenData;

    if (!tokenData || typeof tokenData === "string" || !tokenData.data) {
      throw errorBuilder.unauthorized();
    }

    const user = await companyUsersService.get(tokenData.data.sub);

    if (!user) {
      throw errorBuilder.notFound("User not found");
    }

    return this.createToken(user);
  }

  private signToken(data: CompanyUserTokenPayload) {
    return jwt.sign({ data }, env.jwtSecret, { expiresIn: "7d" });
  }

  private createToken(user: CompanyUserModel) {
    return this.signToken({
      sub: user.id,
      role: "company_user",
    });
  }
}

export const authService = new AuthService();
