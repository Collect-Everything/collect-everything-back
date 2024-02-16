import { CrudController, ctrlWrapper, parseBody } from "@ce/server-core";
import { productsService } from "./products.service";
import {
  ApiResponse,
  ProductBaseSchema,
  ProductSchema,
  LoginDto,
  TProduct,
  TProductBase,
} from "@ce/shared-core";
import { RequestHandler } from "express";
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
