import { Err, IdProvider, Ok, Result } from '@ce/shared-core';
import { AddToCartCommand } from './add-to-cart.command';
import { ProductRepository } from '../../ports/product.repository';
import { ProductNotFoundError } from '../../errors/product-not-found';
import { CartRepository } from '../../ports/cart.repository';
import { Cart } from '../../domain/cart.entity';

export class AddToCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
    private idProvider: IdProvider
  ) {}

  async execute(command: AddToCartCommand): Promise<Result<void, Error>> {
    const product = await this.productRepository.findById(command.productId);

    if (!product) {
      return Err.of(new ProductNotFoundError());
    }

    let cart = await this.cartRepository.findByUserId(command.userId);

    if (!cart) {
      cart = Cart.fromData({
        id: this.idProvider.generate(),
        userId: command.userId,
        products: []
      });
    }

    for (let i = 0; i < command.quantity; i++) {
      cart.addProduct(product);
    }

    await this.cartRepository.save(cart);

    return Ok.of(undefined);
  }
}
