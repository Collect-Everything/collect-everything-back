import { Cart } from '../domain/cart.entity';

export class CartMapper {
  static toDomain(rawCart: any) {}

  static toPersistence(cart: Cart) {
    return {
      id: cart.id,
      customerId: cart.customerId
    };
  }
}
