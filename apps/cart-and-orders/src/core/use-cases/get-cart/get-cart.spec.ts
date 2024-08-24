import { describe, beforeEach, test } from 'vitest';
import { CartFixture, createCartFixture } from '../_fixtures/cart.fixture';
import { Cart } from '../../domain/cart.entity';
import { Product } from '../../domain/product.entity';

describe('Feature: Get cart', () => {
  let fixture: CartFixture;

  beforeEach(() => {
    fixture = createCartFixture();
  });

  test('user can get their cart', async () => {
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
        customerId: 'user-1',
        products: [
          { id: 'product-1', name: 'Product 1', price: 100 },
          { id: 'product-1', name: 'Product 1', price: 100 }
        ]
      })
    ]);

    await fixture.whenUserGetsCart({
      userId: 'user-1'
    });

    fixture.thenCartResponseIs({
      products: [
        {
          id: 'product-1',
          name: 'Product 1',
          price: 100,
          quantity: 2
        }
      ]
    });
  });
});
