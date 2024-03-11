import { GatewayCrudController } from "@ce/server-core";

class ProductsCtrl extends GatewayCrudController {
  constructor() {
    super(
      {
        service: "PRODUCTS",
      },
      "products",
    );
  }
}

export const productsCtrl = new ProductsCtrl();