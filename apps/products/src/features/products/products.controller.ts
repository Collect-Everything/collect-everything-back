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

  validate: RequestHandler = async (req, res, next) => {
    ctrlWrapper(this.getIdentifier("validate"), res, async () => {
      const parsedBody = parseBody(req, LoginDto);
      const item = await productsService.validate(parsedBody);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });
  };
}

export const productsCtrl = new ProductsCtrl();
