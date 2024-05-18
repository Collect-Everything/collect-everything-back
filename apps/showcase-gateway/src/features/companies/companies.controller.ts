import { GatewayController, ctrlWrapper, parseBody } from "@ce/server-core";
import { ApiResponse, CreateCompanyDTOSchema } from "@ce/shared-core";
import { RequestHandler } from "express";
import { CompaniesService } from "./companies.service";

export class CompaniesController extends GatewayController {
  constructor(private readonly companiesService: CompaniesService) {
    super("companies");
  }

  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompany"), res, async () => {
      const body = parseBody(req, CreateCompanyDTOSchema);

      const companyID = await this.companiesService.createCompany(body);

      return {
        success: true,
        data: { companyID },
      } satisfies ApiResponse;
    });
}
