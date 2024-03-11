import { CrudController } from "@ce/server-core";
import { productsService } from "./products.service";
import {
  ProductBaseSchema,
  ProductSchema,
  TProduct,
  TProductBase,
} from "@ce/shared-core";
import { ProductModel } from "./products.model";

class ProductsCtrl extends CrudController<
  TProductBase,
  TProduct,
  ProductModel
> {
  constructor() {
    super({
      name: "products",
      service: productsService,
      baseSchema: ProductBaseSchema,
      schema: ProductSchema,
    });
  }
}

export const productsCtrl = new ProductsCtrl();
