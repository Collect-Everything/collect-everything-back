import { BaseRouter } from '@ce/server-core';
import { OrderController } from './order.controller';

export class OrderRouter extends BaseRouter {
  constructor(private readonly controller: OrderController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/:orderId', this.controller.getOrder);
    this.router.patch('/:orderId/status', this.controller.updateOrderStatus);
    this.router.delete('/:orderId', this.controller.deleteOrder);
    this.router.get('/', this.controller.listOrders);
  }
}
