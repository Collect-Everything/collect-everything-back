import { describe, beforeEach, test, expect } from 'vitest';
import { CartFixture, createCartFixture } from '../_fixtures/cart.fixture';
import { Cart } from '../../domain/cart.entity';
import { Product } from '../../domain/product.entity';

describe('Feature: Remove from cart', () => {
  let fixture: CartFixture;

  beforeEach(() => {
    fixture = createCartFixture();
  });

  test('user can remove a product from the cart', async () => {
    fixture.givenSomeProductExists([
      Product.fromData({
        id: 'product-1',
        name: 'Product 1',
        price: 100
      })
    ]);

    fixture.givenSomeCartExists([
      Cart.fromData({
        id: 'cart-1',
        userId: 'user-1',
        products: [
          { id: 'product-1', name: 'Product 1', price: 100 },
          { id: 'product-1', name: 'Product 1', price: 100 }
        ]
      })
    ]);
  });
});
