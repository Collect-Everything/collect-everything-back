import { RequestHandler } from "express";
import { BaseController, HttpException, ctrlWrapper } from "@ce/server-core";
import { ApiResponse, CreateCompanyDTO } from "@ce/shared-core";
import { CreateCompanyUseCase } from "./core/use-cases/create-company/create-company.usecase";
import { ConfigureStoreUseCase } from "./core/use-cases/configure-store/configure-store.usecase";
import { CompanyAlreadyExistsError } from "./core/use-cases/create-company/create-company.errors";
import {
  CompanyNotFoundError,
  StoreNameAlreadyExistsError,
} from "./core/use-cases/configure-store/configure-store.errors";

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

      const result = await this.createCompanyUseCase.execute(body);

      if (result.isErr()) {
        if (result.error instanceof CompanyAlreadyExistsError) {
          throw new HttpException(400, `Company already exists`);
        }

        throw new HttpException(500, "Unknown error", [result.error]);
      }

      return {
        success: true,
        data: { companyId: result.value.id },
      } satisfies ApiResponse;
    });

  configureStore: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("configureStore"), res, async () => {
      const { companyId } = req.params;
      const body = req.body;

      if (!companyId) {
        throw new HttpException(400, "Missing companyId");
      }

      const result = await this.configureStoreUseCase.execute({
        companyId,
        ...body,
      });
      if (result.isErr()) {
        if (result.error instanceof StoreNameAlreadyExistsError) {
          throw new HttpException(400, `Store name already exists`);
        }
        if (result.error instanceof CompanyNotFoundError) {
          throw new HttpException(404, `Company ${companyId} not found`);
        }
        throw new HttpException(500, "Unknown error", [result.error]);
      }
      return {
        success: true,
        data: {},
      } satisfies ApiResponse;
    });
}
