import { GatewayController, ctrlWrapper, parseBody } from "@ce/server-core";
import { RequestHandler } from "express";
import { CompanyCustomersService } from "./company-customers.service";
import { ApiResponse } from "@ce/shared-core";

export class CompanyCustomersController extends GatewayController {
  constructor(private readonly companyUsersService: CompanyCustomersService) {
    super("companycustomers");
  }
}
