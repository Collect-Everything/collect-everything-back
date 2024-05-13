import { RequestHandler } from "express";
import { ctrlWrapper, parseBody } from "@ce/server-core";
import { CompanyService } from "./application/company.service";
import { ApiResponse, CreateCompanySchema } from "@ce/shared-core";

export class CompanyCtrl {
  constructor(private companyService: CompanyService) {}

  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("create"), res, async () => {
      const parsedBody = parseBody(req, CreateCompanySchema);

      console.log("company_controller_parsedBody", parsedBody);

      await this.companyService.create(parsedBody);

      return {
        success: true,
        data: {},
      } satisfies ApiResponse;
    });
  private getIdentifier = (methodName: string) => {
    return `[CrudController] companyCtrl.${methodName}`;
  };
}
