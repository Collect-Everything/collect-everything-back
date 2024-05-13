import { CompanyUserModel } from "@ce/db";
import { apiConfig } from "../../../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";

import { hashPassword } from "@ce/server-core";
import { companyUserModel } from "../../../../lib/db";
import { InferCreationAttributes } from "sequelize";

class CompanyUsersService extends SequelizeService<CompanyUserModel> {
  constructor() {
    super(companyUserModel, apiConfig);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }

  async validate(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw errorBuilder.notFound("User not found");
    }
  }

  // Override
  async create(
    data: InferCreationAttributes<CompanyUserModel>,
  ): Promise<CompanyUserModel> {
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    return await super.create(data);
  }
}

export const companyUsersService = new CompanyUsersService();
