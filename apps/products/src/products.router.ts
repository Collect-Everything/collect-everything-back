import { BaseRouter } from "@ce/server-core";
import { ProductsController } from "./products.controller";

export class ProductsRouter extends BaseRouter {
  constructor(private controller: ProductsController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    //this.router.post("/create", [], this.controller.create);
  }
}
