import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import { companyUsersService } from "./company-users.service";
import {
  ApiResponse,
  CompanyUserBaseSchema,
  CompanyUserSchema,
  LoginDto,
  TCompanyUser,
  TCompanyUserBase,
} from "@ce/shared-core";
import { RequestHandler } from "express";
import { CompanyUserModel } from "./company-user.model";

class CompanyUsersCtrl extends CrudController<
  TCompanyUserBase,
  TCompanyUser,
  CompanyUserModel
> {
  constructor() {
    super({
      name: "company_users",
      service: companyUsersService,
      baseSchema: CompanyUserBaseSchema,
      schema: CompanyUserSchema,
    });
  }

  validate: RequestHandler = async (req, res, next) => {
    ctrlWrapper(this.getIdentifier("validate"), res, async () => {
      const parsedBody = parseBody(req, LoginDto);
      const item = await companyUsersService.validate(parsedBody);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });
  };
}

export const companyUsersCtrl = new CompanyUsersCtrl();
