import { BaseRouter } from "@ce/server-core";
import { OrdersController } from "./orders.controller";

export class OrdersRouter extends BaseRouter {
  constructor(private controller: OrdersController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    //this.router.post("/create", [], this.controller.create);
  }
}
