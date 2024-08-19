import { BaseResponse, GatewayService } from '@ce/server-core';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { PaginatedQuery } from '@ce/shared-core';

export class ProductsService extends GatewayService {
  constructor() {
    super('products', {
      gatewayName: 'SHOWCASE_GATEWAY',
      serviceName: 'PRODUCTS'
    });
  }

  async createCategory(data: CreateCategoryDTO) {
    const handler = this.fetcher.post<BaseResponse<{ categoryId: string }>>(
      '/categories',
      data
    );
    return this.executeRequest(handler);
  }

  async listCategories() {
    const handler =
      this.fetcher.get<BaseResponse<{ categories: string[] }>>('/categories');
    return this.executeRequest(handler);
  }

  async createProduct(data: CreateProductDto) {
    const handler = this.fetcher.post<BaseResponse<{ productId: string }>>(
      '/products',
      data
    );
    return this.executeRequest(handler);
  }

  async listProducts(companyId: string, query: PaginatedQuery) {
    const handler = this.fetcher.get<BaseResponse<{ products: string[] }>>(
      `/products?companyId=${companyId}&page=${query.page}&limit=${query.limit}`
    );
    return this.executeRequest(handler);
  }
}
