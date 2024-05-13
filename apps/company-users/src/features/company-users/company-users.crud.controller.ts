import { CrudController, ctrlWrapper } from "@ce/server-core";
import { companyUsersService } from "./application/crud/company-users.crud.service";
import { RequestHandler } from "express";
import {
  ApiResponse,
  CreateCompanyUserSchema,
  UpdateCompanyUserSchema,
} from "@ce/shared-core";

class CompanyUsersCtrl extends CrudController {
  constructor() {
    super({
      name: "company_users",
      service: companyUsersService,
      schemaForCreate: CreateCompanyUserSchema,
      schemaForUpdate: UpdateCompanyUserSchema,
    });
  }

  validate: RequestHandler = async (req, res) => {
    ctrlWrapper(this.getIdentifier("validate"), res, async () => {
      const email = req.body.email;
      if (!email) {
        throw new Error("Email is required");
      }
      const item = await companyUsersService.validate(email);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });
  };
}

export const companyUsersCtrl = new CompanyUsersCtrl();
