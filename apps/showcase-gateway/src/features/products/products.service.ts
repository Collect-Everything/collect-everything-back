import { BaseResponse, GatewayService } from "@ce/server-core";
import { CreateCategoryDTO } from "./dtos/create-category.dto";

export class ProductsService extends GatewayService {
  constructor() {
    super("products", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "PRODUCTS",
    });
  }

  async createCategory(data: CreateCategoryDTO) {
    const handler = this.fetcher.post<BaseResponse<{ categoryId: string }>>(
      "/category",
      data,
    );

    return this.executeRequest(handler);
  }
}
