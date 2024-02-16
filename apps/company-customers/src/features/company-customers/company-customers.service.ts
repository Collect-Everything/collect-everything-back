import {
  LoginDto,
  TCompanyCustomer,
  TCompanyCustomerBase,
} from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";
import { CompanyCustomerModel } from "./company-customer.model";

class CompanyCustomersService extends SequelizeService<
  TCompanyCustomerBase,
  TCompanyCustomer,
  CompanyCustomerModel
> {
  constructor() {
    super(CompanyCustomerModel, apiConfig);
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
}

export const companyCustomersService = new CompanyCustomersService();
