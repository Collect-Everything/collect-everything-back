import { CrudRouter } from "@ce/server-core";
import { productsCtrl } from "./products.controller";
import { TProduct } from "@ce/shared-core";

class ProductsRouter extends CrudRouter<TProduct> {
  constructor() {
    super({
      ctrl: productsCtrl,
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/validate", [], productsCtrl.validate);
  }
}

export const productsRouter = new ProductsRouter().router;
