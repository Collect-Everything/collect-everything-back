import { BaseRouter } from "@ce/server-core";
import { ProductsController } from "./products.controller";

export class ProductsRouter extends BaseRouter {
  constructor(private readonly productsCtrl: ProductsController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post("/category", this.productsCtrl.createCategory);
  }
}
