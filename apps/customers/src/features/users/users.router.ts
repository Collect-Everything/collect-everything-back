import { CrudRouter } from "@ce/server-core";
import { usersCtrl } from "./users.controller.back";
import { TUser } from "@ce/shared-core";

class UsersRouter extends CrudRouter<TUser> {
  constructor() {
    super({
      backCtrl: usersCtrl,
      middlewares: {
        get: [],
        create: [],
        delete: [],
        patch: [],
        post: [],
        list: [],
      },
    });
  }

  protected addRoutesBeforeCrud() {}
}

export const usersRouter = new UsersRouter().router;
