import { Cart } from '../domain/cart.entity';

export interface CartRepository {
  findByUserId(userId: string): Promise<Cart | undefined>;
  save(cart: Cart): Promise<void>;
}
