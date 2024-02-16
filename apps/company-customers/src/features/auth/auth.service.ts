import {
  CompanyCustomerTokenPayload,
  CreateCompanyCustomerDto,
  LoginDto,
  TokenData,
} from "@ce/shared-core";
import { companyCustomersService } from "../company-customers/company-customers.service";
import {
  IAuthService,
  comparePasswords,
  errorBuilder,
  hashPassword,
} from "@ce/server-core";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { CompanyCustomerModel } from "../company-customers/company-customer.model";

class AuthService implements IAuthService {
  constructor() {}

  async login(loginDto: LoginDto) {
    const customer = await companyCustomersService.findByEmail(loginDto.email);

    if (!customer) {
      throw errorBuilder.notFound("Customer not found");
    }

    const passwordIsValid = await comparePasswords(
      loginDto.password,
      customer.password
    );

    if (!passwordIsValid) {
      throw errorBuilder.invalidCredentials();
    }

    return this.createToken(customer);
  }

  async register(companyCustomerDto: CreateCompanyCustomerDto) {
    const customer = await companyCustomersService.findByEmail(
      companyCustomerDto.email
    );

    if (customer) {
      throw errorBuilder.alreadyExists();
    }

    const hashedPassword = await hashPassword(companyCustomerDto.password);
    return companyCustomersService.create({
      ...companyCustomerDto,
      password: hashedPassword,
    });
  }

  async refreshToken(token: string) {
    const tokenData = jwt.verify(token, env.jwtSecret) as TokenData;

    if (!tokenData || typeof tokenData === "string" || !tokenData.data) {
      throw errorBuilder.unauthorized();
    }

    const customer = await companyCustomersService.get(tokenData.data.sub);

    if (!customer) {
      throw errorBuilder.notFound("Customer not found");
    }

    return this.createToken(customer);
  }

  private signToken(data: CompanyCustomerTokenPayload) {
    return jwt.sign({ data }, env.jwtSecret, { expiresIn: "7d" });
  }

  private createToken(customer: CompanyCustomerModel) {
    return this.signToken({
      sub: customer.id,
      role: "company_customer",
    });
  }
}

export const authService = new AuthService();
