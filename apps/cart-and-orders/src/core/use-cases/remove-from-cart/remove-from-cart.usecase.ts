import { Err, Ok, Result } from '@ce/shared-core';
import { CartRepository } from '../../ports/cart.repository';
import { ProductRepository } from '../../ports/product.repository';
import { RemoveFromCartCommand } from './remove-from-cart.command';
import { CartNotFoundError } from '../../errors/cart-not-found';
import { ProductNotInCartError } from './remove-from-cart.errors';

export class RemoveFromCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(
    command: RemoveFromCartCommand
  ): Promise<Result<void, CartNotFoundError | ProductNotInCartError>> {
    const cart = await this.cartRepository.findByUserId(command.userId);

    if (!cart) {
      return Err.of(new CartNotFoundError());
    }

    if (!cart.hasProduct(command.productId)) {
      return Err.of(new ProductNotInCartError());
    }

    for (let i = 0; i < command.quantity; i += 1) {
      if (!cart.hasProduct(command.productId)) {
        break;
      }
      cart.removeProduct(command.productId);
    }

    await this.cartRepository.save(cart);

    return Ok.of(undefined);
  }
}
