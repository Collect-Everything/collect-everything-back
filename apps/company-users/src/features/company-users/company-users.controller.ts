import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import { customersService } from "./company-users.service";
import {
  ApiResponse,
  CustomerBaseSchema,
  CustomerSchema,
  LoginDTO,
  TCustomer,
  TCustomerBase,
} from "@ce/shared-core";
import { CustomerModel } from "./company-user.model";
import { RequestHandler } from "express";

class CustomersCtrl extends CrudController<
  TCustomerBase,
  TCustomer,
  CustomerModel
> {
  constructor() {
    super({
      name: "customers",
      service: customersService,
      baseSchema: CustomerBaseSchema,
      schema: CustomerSchema,
    });
  }

  validate: RequestHandler = async (req, res, next) => {
    ctrlWrapper(this.name + "validate", res, async () => {
      const parsedBody = parseBody(req, LoginDTO);
      const item = await customersService.validate(parsedBody);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });
  };
}

export const customersCtrl = new CustomersCtrl();
