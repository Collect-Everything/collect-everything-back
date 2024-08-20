import { BaseRouter } from '@ce/server-core';
import { CartController } from './cart.controller';

export class CartRouter extends BaseRouter {
  constructor(private readonly controller: CartController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/add', this.controller.addToCart);
    this.router.get('/:userId', this.controller.getCart);
    this.router.delete('/remove', this.controller.removeFromCart);
  }
}
