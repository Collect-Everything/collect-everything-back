import { CrudController } from "@ce/server-core";
import { TUser, TUserBase, UserSchema, UserBaseSchema } from "@ce/shared-core";
import { usersService } from "./users.service";

class UsersCtrl extends CrudController<TUserBase, TUser> {
  constructor() {
    super({
      name: "users",
      service: usersService,
      baseSchema: UserBaseSchema,
      schema: UserSchema,
    });
  }
}

export const usersCtrl = new UsersCtrl();
