import { BaseRouter } from '@ce/server-core';
import { CartAndOrdersController } from './cart-and-orders.controller';

export class CartAndOrdersRouter extends BaseRouter {
  constructor(private readonly cartAndOrdersCtrl: CartAndOrdersController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/:orderId', this.cartAndOrdersCtrl.getOrder);
    this.router.patch(
      '/:orderId/status',
      this.cartAndOrdersCtrl.updateOrderStatus
    );
    this.router.get('/', this.cartAndOrdersCtrl.listOrders);
  }
}
