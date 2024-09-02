import { BaseResponse, GatewayService } from '@ce/server-core';
import { PaginatedQuery } from '@ce/shared-core';

export class ProductsService extends GatewayService {
  constructor() {
    super('products', {
      gatewayName: 'STORE_GATEWAY',
      serviceName: 'PRODUCTS'
    });
  }

  async listCategories(companyId: string) {
    const handler = this.fetcher.get<BaseResponse<{ categories: string[] }>>(
      `/categories?companyId=${companyId}`
    );
    return this.executeRequest(handler);
  }

  async listProducts(companyId: string, query: PaginatedQuery) {
    console.log('companyId', companyId);
    const handler = this.fetcher.get<BaseResponse>(
      `/products?companyId=${companyId}&page=${query.page}&limit=${query.limit}`
    );
    return this.executeRequest(handler);
  }

  async getProduct(productId: string) {
    const handler = this.fetcher.get<BaseResponse>(`/products/${productId}`);
    return this.executeRequest(handler);
  }
}
