import { LoginDto, TCompanyUser, TCompanyUserBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";
import { CompanyUserModel } from "./company-user.model";

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
}

export const companyUsersService = new CompanyUsersService();
