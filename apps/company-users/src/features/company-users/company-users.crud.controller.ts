import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import { companyUsersService } from "./application/crud/company-users.crud.service";
import { RequestHandler } from "express";
import { CompanyUserModel } from "./model/company-user.model";
import {
  CreateCompanyUser,
  CreateCompanyUserSchema,
} from "./dto/create-company-user.dto";
import {
  UpdateCompanyUser,
  UpdateCompanyUserSchema,
} from "./dto/update-company-user.dto";
import { ApiResponse } from "@ce/shared-core";
import { LoginDto } from "./dto/login.dto";

class CompanyUsersCtrl extends CrudController<
  CreateCompanyUser,
  UpdateCompanyUser,
  CompanyUserModel
> {
  constructor() {
    super({
      name: "company_users",
      service: companyUsersService,
      schemaForCreate: CreateCompanyUserSchema,
      schemaForUpdate: UpdateCompanyUserSchema,
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
