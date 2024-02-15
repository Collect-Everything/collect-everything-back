import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import {
  AdminBaseSchema,
  AdminSchema,
  ApiResponse,
  LoginDTO,
  TAdmin,
  TAdminBase,
} from "@ce/shared-core";
import { RequestHandler } from "express";
import { adminsService } from "./admins.service";
import { AdminModel } from "./admin.model";

class AdminsCtrl extends CrudController<TAdminBase, TAdmin, AdminModel> {
  constructor() {
    super({
      name: "admins",
      service: adminsService,
      baseSchema: AdminBaseSchema,
      schema: AdminSchema,
    });
  }

  validate: RequestHandler = async (req, res, next) => {
    ctrlWrapper(this.name + "validate", res, async () => {
      const parsedBody = parseBody(req, LoginDTO);
      const item = await adminsService.validate(parsedBody);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });
  };
}

export const adminsCtrl = new AdminsCtrl();
