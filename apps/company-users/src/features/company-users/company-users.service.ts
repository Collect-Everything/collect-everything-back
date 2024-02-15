import { LoginDTO, TCustomer, TCustomerBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { CustomerModel } from "./company-user.model";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";

class CustomersService extends SequelizeService<
  TCustomerBase,
  TCustomer,
  CustomerModel
> {
  constructor() {
    super(CustomerModel, apiConfig);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }

  async validate(loginDto: LoginDTO) {
    const user = await this.findByEmail(loginDto.email);
    if (!user) {
      throw errorBuilder.notFound("User not found");
    }
  }
}

export const customersService = new CustomersService();
