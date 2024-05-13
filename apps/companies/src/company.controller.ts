import { RequestHandler } from "express";
import { ctrlWrapper } from "@ce/server-core";
import { ApiResponse, CreateCompanyDTO } from "@ce/shared-core";
import { CreateCompanyUseCase } from "./core/use-cases/create-company/create-company.usecase";

export class CompanyCtrl {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {}

  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("create"), res, async () => {
      const body = req.body as CreateCompanyDTO;

      await this.createCompanyUseCase.execute(body);

      return {
        success: true,
        data: {},
      } satisfies ApiResponse;
    });
  private getIdentifier = (methodName: string) => {
    return `[CrudController] companyCtrl.${methodName}`;
  };
}
