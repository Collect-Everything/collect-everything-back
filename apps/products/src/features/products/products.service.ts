import { TProduct, TProductBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { ProductModel } from "./products.model";

class ProductsService extends SequelizeService<
  TProductBase,
  TProduct,
  ProductModel
> {
  constructor() {
    super(ProductModel, apiConfig);
  }
}

export const productsService = new ProductsService();
