import { RequestHandler } from "express";
import { BaseController, HttpException, ctrlWrapper } from "@ce/server-core";
import { ApiResponse, CreateCompanyDTO } from "@ce/shared-core";
import { CreateCompanyUseCase } from "./core/use-cases/create-company/create-company.usecase";
import { ConfigureStoreUseCase } from "./core/use-cases/configure-store/configure-store.usecase";
import { CompanyAlreadyExistsError } from "./core/use-cases/create-company/create-company.errors";
import { logger } from "@ce/logger";

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
        logger.error(result.error);
        if (result.error instanceof CompanyAlreadyExistsError) {
          throw new HttpException(400, `Company already exists`);
        }

        throw new HttpException(500, "Unknown error");
      }

      return {
        success: true,
        data: { companyId: result.value.id },
      } satisfies ApiResponse;
    });
}
