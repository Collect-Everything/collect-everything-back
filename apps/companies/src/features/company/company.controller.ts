import { RequestHandler } from "express";
import { CompanyService } from "./application/company.service";
import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import { ApiResponse, CreateCompanySchema } from "@ce/shared-core";

export class CompanyCtrl {
  constructor(private companyService: CompanyService) {}

  create: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("create"), res, async () => {
      const parsedBody = parseBody(req, CreateCompanySchema);

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
