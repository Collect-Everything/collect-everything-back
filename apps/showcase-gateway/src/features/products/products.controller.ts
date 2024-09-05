import {
  BadRequestError,
  BaseResponse,
  BodyValidationError,
  GatewayController,
  Req,
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
import {
  UpdateCategoryDTO,
  UpdateCategoryDtoSchema
} from '../../dtos/update-category.dto';
import { getFileUrl } from '../../lib/multer';

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

  listCategories: RequestHandler = (req: Req, res) =>
    ctrlWrapper(this.getIdentifier('listCategories'), res, async () => {
      const user = req.user
      const listCategoriesResult = await this.productsService.listCategories(user.companyId);
      if (listCategoriesResult.isErr()) {
        throw listCategoriesResult.error;
      }
      return {
        status: 200,
        success: true,
        data: listCategoriesResult.value.data
      } satisfies BaseResponse;
    });

  updateCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('updateCategory'), res, async () => {
      const { categoryId } = req.params;
      if (!categoryId) {
        throw new BadRequestError({ message: 'categoryId is required' });
      }
      const body = parseBody<UpdateCategoryDTO>(req, UpdateCategoryDtoSchema);
      const updateCategoryResult = await this.productsService.updateCategory(
        categoryId as string,
        body
      );
      if (updateCategoryResult.isErr()) {
        throw updateCategoryResult.error;
      }
      return {
        status: 200,
        success: true,
        data: updateCategoryResult.value.data
      } satisfies BaseResponse;
    });

  deleteCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('deleteCategory'), res, async () => {
      const { categoryId } = req.params;
      if (!categoryId) {
        throw new BadRequestError({ message: 'categoryId is required' });
      }
      const deleteCategoryResult = await this.productsService.deleteCategory(
        categoryId as string
      );
      if (deleteCategoryResult.isErr()) {
        throw deleteCategoryResult.error;
      }
      return {
        status: 200,
        success: true,
        data: deleteCategoryResult.value.data
      } satisfies BaseResponse;
    });

  createProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('createProduct'), res, async () => {
      const body = parseBody<CreateProductDto>(req, CreateProductDtoSchema);
      const imageFile = req.file
      const createProductResult =
        await this.productsService.createProduct({
          ...body,
          image: imageFile ? getFileUrl(imageFile.filename) : body.image
        });
      if (createProductResult.isErr()) {
        throw createProductResult.error;
      }
      return {
        status: 201,
        success: true,
        data: createProductResult.value.data
      } satisfies BaseResponse;
    });

  listProducts: RequestHandler = (req: Req, res) =>
    ctrlWrapper(this.getIdentifier('listProducts'), res, async () => {
      const { companyId } = req.user
      const { page, limit } = req.query;
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
      const imageFile = req.file
      const body = parseBody<UpdateProductDto>(req, UpdateProductDtoSchema);
      const updateProductResult = await this.productsService.updateProduct(
        productId as string,
        { ...body, image: imageFile ? getFileUrl(imageFile.filename) : body.image }

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
