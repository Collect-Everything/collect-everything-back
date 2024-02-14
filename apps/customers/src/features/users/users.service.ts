import { apiConfig } from "../../config/api.config";
import { TUser, TUserBase } from "@ce/shared-core";
import { UserModel } from "./user.model";
import { SequelizeService } from "@ce/sequelize";

const DEFAULT_SELECT = { password: 0 };

class UsersService extends SequelizeService<TUserBase, TUser, UserModel> {
  constructor() {
    super(UserModel, apiConfig);
  }

  findByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }
}

export const usersService = new UsersService();
