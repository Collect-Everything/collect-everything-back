import { GatewayController, ctrlWrapper, parseBody } from "@ce/server-core";
import { RequestHandler } from "express";
import { CompanyUsersService } from "./company-users.service";
import { ApiResponse, CreateCompanyUserDTOSchema } from "@ce/shared-core";

export class CompanyUsersController extends GatewayController {
  constructor(private readonly companyUsersService: CompanyUsersService) {
    super("companyUsers");
  }

  registerCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompanyUser"), res, async () => {
      const body = parseBody(req, CreateCompanyUserDTOSchema);
      await this.companyUsersService.register(body);

      return { success: true, data: {} } satisfies ApiResponse;
    });
}
