import { BaseRouter } from "@ce/server-core";
import { CartController } from "./cart.controller";

export class CartRouter extends BaseRouter {
  constructor(private controller: CartController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    //this.router.post("/create", [], this.controller.create);
  }
}
