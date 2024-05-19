import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper,
  parseBody,
} from "@ce/server-core";
import { RequestHandler } from "express";
import { CompaniesService } from "./companies.service";
import { CompanyUsersService } from "../company-users/company-users.service";
import {
  CreateCompanyAndAdminDTO,
  CreateCompanyAndAdminDTOSchema,
} from "../../dtos/create-company-and-admin.dto";

export class CompaniesController extends GatewayController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly companyUsersService: CompanyUsersService,
  ) {
    super("companies");
  }

  createCompanyAndAdmin: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompany"), res, async () => {
      const body = parseBody<CreateCompanyAndAdminDTO>(
        req,
        CreateCompanyAndAdminDTOSchema,
      );

      const createCompanyResult = await this.companiesService.createCompany(
        body.company,
      );

      if (createCompanyResult.isErr()) {
        throw new HttpException(400, createCompanyResult.error.message);
      }

      const registerResult = await this.companyUsersService.register({
        ...body.admin,
        companyId: createCompanyResult.value.data.companyId,
        roles: ["ADMIN"],
      });

      if (registerResult.isErr()) {
        throw new HttpException(400, registerResult.error.message);
      }

      return {
        status: 201,
        success: true,
        data: {},
      } satisfies BaseResponse;
    });
}
