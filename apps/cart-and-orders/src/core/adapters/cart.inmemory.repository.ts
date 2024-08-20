import { Cart } from '../domain/cart.entity';
import { CartRepository } from '../ports/cart.repository';

export class InMemoryCartRepository implements CartRepository {
  carts: Cart[] = [];

  async save(cart: Cart) {
    this.carts.push(cart);
  }

  async findByUserId(userId: string): Promise<Cart | undefined> {
    return this.carts.find((cart) => cart.userId === userId);
  }
}
