import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import { companyCustomersService } from "./company-customers.service";
import {
  ApiResponse,
  CompanyCustomerBaseSchema,
  CompanyCustomerSchema,
  LoginDto,
  TCompanyCustomer,
  TCompanyCustomerBase,
} from "@ce/shared-core";
import { RequestHandler } from "express";
import { CompanyCustomerModel } from "./company-customer.model";

class CompanyCustomersCtrl extends CrudController<
  TCompanyCustomerBase,
  TCompanyCustomer,
  CompanyCustomerModel
> {
  constructor() {
    super({
      name: "company_customers",
      service: companyCustomersService,
      baseSchema: CompanyCustomerBaseSchema,
      schema: CompanyCustomerSchema,
    });
  }

  validate: RequestHandler = async (req, res, next) => {
    ctrlWrapper(this.getIdentifier("validate"), res, async () => {
      const parsedBody = parseBody(req, LoginDto);
      const item = await companyCustomersService.validate(parsedBody);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });
  };
}

export const companyCustomersCtrl = new CompanyCustomersCtrl();
