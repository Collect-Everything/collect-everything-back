import { Err, Ok } from '@ce/shared-core';
import { CartRepository } from '../../ports/cart.repository';
import { GetCartQuery } from './get-cart.query';
import { CartNotFoundError } from '../../errors/cart-not-found';
import { Product } from '../../domain/product.entity';

export interface CartResponseDto {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
export class GetCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(query: GetCartQuery) {
    const cart = await this.cartRepository.findByUserId(query.userId);

    if (!cart) {
      return Err.of(new CartNotFoundError());
    }

    const uniqueProducts = Array.from(
      new Set(cart.products.map((p) => p.id))
    ).map((id) => cart.products.find((p) => p.id === id)) as Product[];

    return Ok.of({
      products: uniqueProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: cart.quantityOf(product.id)
      }))
    });
  }
}
