import { BaseController, HttpException, ctrlWrapper } from "@ce/server-core";
import { CreateCategoryUseCase } from "./core/use-cases/create-category/create-category.usecase";
import { CreateProductUseCase } from "./core/use-cases/create-product/create-product.usecase";
import { DeleteProductUseCase } from "./core/use-cases/delete-product/delete-product.usecase";
import { GetProductUseCase } from "./core/use-cases/get-product/get-product.usecase";
import { ListProductsUseCase } from "./core/use-cases/list-products/list-products.usecase";
import { UpdateProductUseCase } from "./core/use-cases/update-product/update-product.usecase";
import { CategoryAlreadyExistsError } from "./core/use-cases/create-category/create-category.errors";
import { ApiResponse } from "@ce/shared-core";
import { RequestHandler } from "express";
import { CategoryNotFoundError } from "./core/errors/category-not-found";
import { ListCategoriesUseCase } from "./core/use-cases/list-categories/list-categories.usecase";
import { ListProductsQuery } from "./core/use-cases/list-products/list-products.query";

export class ProductsController extends BaseController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
  ) {
    super("ProductsController");
  }

  createCategory: RequestHandler = async (req, res) =>
    ctrlWrapper(this.getIdentifier("createCategory"), res, async () => {
      const body = req.body;

      const result = await this.createCategoryUseCase.execute(body);

      if (result.isErr()) {
        if (result.error instanceof CategoryAlreadyExistsError) {
          throw new HttpException(400, `Category already exists`);
        }

        throw new HttpException(500, "Unknown error", [result.error]);
      }

      return {
        success: true,
        data: result.value,
      } satisfies ApiResponse;
    });

  createProduct: RequestHandler = async (req, res) =>
    ctrlWrapper(this.getIdentifier("createProduct"), res, async () => {
      const body = req.body;

      const result = await this.createProductUseCase.execute(body);

      if (result.isErr()) {
        if (result.error instanceof CategoryNotFoundError) {
          throw new HttpException(400, `Category not found`);
        }

        throw new HttpException(500, "Unknown error", [result.error]);
      }

      return {
        success: true,
        data: result.value,
      } satisfies ApiResponse;
    });

  listProducts: RequestHandler = async (req, res) =>
    ctrlWrapper(this.getIdentifier("listProducts"), res, async () => {
      const query = req.query;
      console.log("query", query);
      const result = await this.listProductsUseCase.execute({
        ...query,
        limit: parseInt(query.limit as string),
        page: parseInt(query.page as string),
      });

      console.log(result);
      return {
        success: true,
        data: result.value,
      } satisfies ApiResponse;
    });

  getProduct: RequestHandler = async (req, res) =>
    ctrlWrapper(this.getIdentifier("getProduct"), res, async () => {
      const productId = req.params.productId;
      const result = await this.getProductUseCase.execute({ productId });
      return {
        success: true,
        data: result,
      } satisfies ApiResponse;
    });

  updateProduct: RequestHandler = async (req, res) =>
    ctrlWrapper(this.getIdentifier("updateProduct"), res, async () => {
      const productId = req.params.productId;
      const body = req.body;
      const result = await this.updateProductUseCase.execute({
        productId,
        ...body,
      });
      return {
        success: true,
        data: result,
      } satisfies ApiResponse;
    });

  deleteProduct: RequestHandler = async (req, res) =>
    ctrlWrapper(this.getIdentifier("deleteProduct"), res, async () => {
      const productId = req.params.productId;
      const result = await this.deleteProductUseCase.execute({ productId });
      return {
        success: true,
        data: result,
      } satisfies ApiResponse;
    });

  listCategories: RequestHandler = async (req, res) =>
    ctrlWrapper(this.getIdentifier("listCategories"), res, async () => {
      const query = req.query;
      const result = await this.listCategoriesUseCase.execute(query);
      return {
        success: true,
        data: result,
      } satisfies ApiResponse;
    });
}
