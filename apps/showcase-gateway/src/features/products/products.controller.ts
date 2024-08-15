import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper,
  parseBody,
} from "@ce/server-core";
import { ProductsService } from "./products.service";
import { RequestHandler } from "express";
import {
  CreateCategoryDTO,
  CreateCategoryDtoSchema,
} from "./dtos/create-category.dto";
import { CompaniesService } from "../companies/companies.service";

export class ProductsController extends GatewayController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly companiesService: CompaniesService,
  ) {
    super("products");
  }

  createCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCategory"), res, async () => {
      const body = parseBody<CreateCategoryDTO>(req, CreateCategoryDtoSchema);

      const categoryExistsResult = await this.companiesService.getCompany(
        body.companyId,
      );

      if (categoryExistsResult.isErr()) {
        throw new HttpException(400, categoryExistsResult.error.message);
      }

      const createCategoryResult =
        await this.productsService.createCategory(body);

      if (createCategoryResult.isErr()) {
        throw new HttpException(400, createCategoryResult.error.message);
      }

      return {
        status: 201,
        success: true,
        data: createCategoryResult.value.data,
      } satisfies BaseResponse;
    });
}
