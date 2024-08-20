import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper,
  parseBody
} from '@ce/server-core';
import { ProductsService } from './products.service';
import { RequestHandler } from 'express';
import {
  CreateCategoryDTO,
  CreateCategoryDtoSchema
} from './dtos/create-category.dto';
import { CompaniesService } from '../companies/companies.service';
import {
  CreateProductDto,
  CreateProductDtoSchema
} from './dtos/create-product.dto';
import { PaginatedQuerySchema } from '@ce/shared-core';
import {
  UpdateProductDto,
  UpdateProductDtoSchema
} from './dtos/update-product.dto';

export class ProductsController extends GatewayController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly companiesService: CompaniesService
  ) {
    super('products');
  }

  createCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('createCategory'), res, async () => {
      const body = parseBody<CreateCategoryDTO>(req, CreateCategoryDtoSchema);

      const categoryExistsResult = await this.companiesService.getCompany(
        body.companyId
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
        data: createCategoryResult.value.data
      } satisfies BaseResponse;
    });

  listCategories: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listCategories'), res, async () => {
      const listCategoriesResult = await this.productsService.listCategories();
      if (listCategoriesResult.isErr()) {
        throw new HttpException(400, listCategoriesResult.error.message);
      }
      return {
        status: 200,
        success: true,
        data: listCategoriesResult.value.data
      } satisfies BaseResponse;
    });

  createProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('createProduct'), res, async () => {
      const body = parseBody<CreateProductDto>(req, CreateProductDtoSchema);
      const createProductResult =
        await this.productsService.createProduct(body);
      if (createProductResult.isErr()) {
        throw new HttpException(400, createProductResult.error.message);
      }
      return {
        status: 201,
        success: true,
        data: createProductResult.value.data
      } satisfies BaseResponse;
    });

  listProducts: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listProducts'), res, async () => {
      const { companyId, page, limit } = req.query;
      const query = PaginatedQuerySchema.safeParse({ page, limit });

      if (!query.success) {
        throw new HttpException(400, query.error.errors[0].message);
      }
      if (!companyId) {
        throw new HttpException(400, 'companyId is required to list products');
      }
      const listProductsResult = await this.productsService.listProducts(
        companyId as string,
        query.data
      );
      if (listProductsResult.isErr()) {
        throw new HttpException(400, listProductsResult.error.message);
      }
      return {
        status: 200,
        success: true,
        data: listProductsResult.value.data
      } satisfies BaseResponse;
    });

  getProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getProduct'), res, async () => {
      const { productId } = req.params;
      if (!productId) {
        throw new HttpException(400, 'productId is required to get product');
      }
      const getProductResult = await this.productsService.getProduct(
        productId as string
      );
      if (getProductResult.isErr()) {
        throw new HttpException(400, getProductResult.error.message);
      }
      return {
        status: 200,
        success: true,
        data: getProductResult.value.data
      } satisfies BaseResponse;
    });

  updateProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('updateProduct'), res, async () => {
      const { productId } = req.params;
      if (!productId) {
        throw new HttpException(400, 'productId is required to update product');
      }
      const body = parseBody<UpdateProductDto>(req, UpdateProductDtoSchema);
      const updateProductResult = await this.productsService.updateProduct(
        productId as string,
        body
      );
      if (updateProductResult.isErr()) {
        throw new HttpException(400, updateProductResult.error.message);
      }
      return {
        status: 200,
        success: true,
        data: updateProductResult.value.data
      } satisfies BaseResponse;
    });

  deleteProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('deleteProduct'), res, async () => {
      const { productId } = req.params;
      if (!productId) {
        throw new HttpException(400, 'productId is required to delete product');
      }
      const deleteProductResult = await this.productsService.deleteProduct(
        productId as string
      );
      if (deleteProductResult.isErr()) {
        throw new HttpException(400, deleteProductResult.error.message);
      }
      return {
        status: 200,
        success: true,
        data: deleteProductResult.value.data
      } satisfies BaseResponse;
    });
}
