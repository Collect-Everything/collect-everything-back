import {
  BadRequestError,
  BaseResponse,
  BodyValidationError,
  GatewayController,
  ctrlWrapper,
  parseBody
} from '@ce/server-core';
import { ProductsService } from './products.service';
import { RequestHandler } from 'express';
import {
  CreateCategoryDTO,
  CreateCategoryDtoSchema
} from '../../dtos/create-category.dto';
import { CompaniesService } from '../companies/companies.service';
import {
  CreateProductDto,
  CreateProductDtoSchema
} from '../../dtos/create-product.dto';
import { PaginatedQuerySchema } from '@ce/shared-core';
import {
  UpdateProductDto,
  UpdateProductDtoSchema
} from '../../dtos/update-product.dto';

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
        throw categoryExistsResult.error;
      }

      const createCategoryResult =
        await this.productsService.createCategory(body);

      if (createCategoryResult.isErr()) {
        throw createCategoryResult.error;
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
        throw listCategoriesResult.error;
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
        throw createProductResult.error;
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
        throw new BodyValidationError({ message: query.error.message });
      }
      if (!companyId) {
        throw new BadRequestError({
          message: 'companyId is required to list products'
        });
      }
      const listProductsResult = await this.productsService.listProducts(
        companyId as string,
        query.data
      );
      if (listProductsResult.isErr()) {
        throw listProductsResult.error;
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
        throw new BadRequestError({ message: 'productId is required' });
      }
      const getProductResult = await this.productsService.getProduct(
        productId as string
      );
      if (getProductResult.isErr()) {
        throw getProductResult.error;
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
        throw new BadRequestError({ message: 'productId is required' });
      }
      const body = parseBody<UpdateProductDto>(req, UpdateProductDtoSchema);
      const updateProductResult = await this.productsService.updateProduct(
        productId as string,
        body
      );
      if (updateProductResult.isErr()) {
        throw updateProductResult.error;
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
        throw new BadRequestError({ message: 'productId is required' });
      }
      const deleteProductResult = await this.productsService.deleteProduct(
        productId as string
      );
      if (deleteProductResult.isErr()) {
        throw deleteProductResult.error;
      }
      return {
        status: 200,
        success: true,
        data: deleteProductResult.value.data
      } satisfies BaseResponse;
    });
}
