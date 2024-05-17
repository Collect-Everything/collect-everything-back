import { RequestHandler } from "express";
import { BaseController, ctrlWrapper } from "@ce/server-core";
import { ApiResponse, CreateCompanyDTO } from "@ce/shared-core";
import { CreateCompanyUseCase } from "./core/use-cases/create-company/create-company.usecase";
import { ConfigureStoreUseCase } from "./core/use-cases/configure-store/configure-store.usecase";

export class CompanyController extends BaseController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private configureStoreUseCase: ConfigureStoreUseCase,
  ) {
    super("CompanyController");
  }

  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompany"), res, async () => {
      const body = req.body as CreateCompanyDTO;

      await this.createCompanyUseCase.execute(body);

      return {
        success: true,
        data: {},
      } satisfies ApiResponse;
    });
}
