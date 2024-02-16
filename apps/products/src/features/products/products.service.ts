import { LoginDto, TProduct, TProductBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { errorBuilder } from "@ce/server-core";
import { ProductModel } from "./products.model";

class ProductsService extends SequelizeService<
  TProductBase,
  TProduct,
  ProductModel
> {
  constructor() {
    super(ProductModel, apiConfig);
  }

  async validate(productDto: ProductDto) {
    // todo
    // if (!user) {
    //   throw errorBuilder.notFound("User not found");
    // }
  }
}

export const productsService = new ProductsService();
