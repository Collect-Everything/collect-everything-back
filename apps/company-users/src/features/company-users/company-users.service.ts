import { LoginDto, TCompanyUser, TCompanyUserBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";
import { CompanyUserModel } from "./company-user.model";

import { hashPassword } from "@ce/server-core";

class CompanyUsersService extends SequelizeService<
  TCompanyUserBase,
  TCompanyUser,
  CompanyUserModel
> {
  constructor() {
    super(CompanyUserModel, apiConfig);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }

  async validate(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email);
    if (!user) {
      throw errorBuilder.notFound("User not found");
    }
  }

  // Override
  async create(data: TCompanyUserBase): Promise<CompanyUserModel>{
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    return await super.create(data);
  }
}

export const companyUsersService = new CompanyUsersService();
