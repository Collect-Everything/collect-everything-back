import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import { companyCustomersService } from "./company-customers.service";
import {
  ApiResponse,
  CompanyCustomerBaseSchema,
  CompanyCustomerSchema,
  LoginDTO,
} from "@ce/shared-core";
import { RequestHandler } from "express";

class CompanyCustomersCtrl extends CrudController {
  constructor() {
    super({
      name: "company_customers",
      service: companyCustomersService,
      schemaForCreate: CompanyCustomerBaseSchema,
      schemaForUpdate: CompanyCustomerSchema,
    });
  }

  validate: RequestHandler = async (req, res) => {
    ctrlWrapper(this.getIdentifier("validate"), res, async () => {
      const parsedBody = parseBody(req, LoginDTO);
      const item = await companyCustomersService.validate(parsedBody);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });
  };
}

export const companyCustomersCtrl = new CompanyCustomersCtrl();
