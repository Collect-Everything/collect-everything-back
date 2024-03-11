import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class ProductsCtrl extends GatewayController {
  constructor() {
    super("products",{
        service: "PRODUCTS",
      },
    );
  }

  getlistProducts: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getlistProducts"), res, async () => {
      const { data } = await this.fetcher.get("/products");
      return data;
    });

    getOneProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneProduct"), res, async () => {
        const {id} = req.params;
        if(!id){
            throw errorBuilder.badRequest();
        }
      const { data } = await this.fetcher.get(`/products/${id}`);
      return data;
    });
}

export const productsCtrl = new ProductsCtrl();