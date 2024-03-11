import { CrudRouter } from "@ce/server-core";
import { productsCtrl } from "./products.controller";
import { TProduct } from "@ce/shared-core";

class ProductsRouter extends CrudRouter<TProduct> {
  constructor() {
    super({
      ctrl: productsCtrl,
    });
  }

  protected addRoutesBeforeCrud() {}
}

export const productsRouter = new ProductsRouter().router;
