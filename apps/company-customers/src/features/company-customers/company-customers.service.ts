import { LoginDto } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";

import { hashPassword } from "@ce/server-core";
import { CompanyCustomerModel } from "@ce/db";
import { companyCustomerModel } from "../../lib/db";
import { InferCreationAttributes } from "sequelize";

class CompanyCustomersService extends SequelizeService<CompanyCustomerModel> {
  constructor() {
    super(companyCustomerModel, apiConfig);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }

  async validate(loginDto: LoginDto) {
    const customer = await this.findByEmail(loginDto.email);
    if (!customer) {
      throw errorBuilder.notFound("Customer not found");
    }
  }

  // Override
  async create(data: InferCreationAttributes<CompanyCustomerModel>) {
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    return await super.create(data);
  }
}

export const companyCustomersService = new CompanyCustomersService();
