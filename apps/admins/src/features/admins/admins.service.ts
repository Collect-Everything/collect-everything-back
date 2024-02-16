import { LoginDto, TAdmin, TAdminBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { AdminModel } from "./admin.model";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";

class AdminsService extends SequelizeService<TAdminBase, TAdmin, AdminModel> {
  constructor() {
    super(AdminModel, apiConfig);
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

export const adminsService = new AdminsService();
