import { describe, beforeEach, test, expect } from 'vitest';
import { Cart } from '../../domain/cart.entity';
import { CartFixture, createCartFixture } from '../_fixtures/cart.fixture';
import { Product } from '../../domain/product.entity';

describe('Feature: Add to cart', () => {
  let fixture: CartFixture;

  beforeEach(() => {
    fixture = createCartFixture();
  });

  test('the user can add a product to the cart', async () => {
    fixture.givenPredefinedId('cart-1');
    fixture.givenSomeProductExists([
      Product.fromData({
        id: 'product-1',
        name: 'Product 1',
        price: 100
      })
    ]);

    await fixture.whenUserAddsProductToCart({
      userId: 'user-1',
      productId: 'product-1',
      quantity: 1
    });

    fixture.thenCartIs(
      Cart.fromData({
        id: 'cart-1',
        userId: 'user-1',
        products: [{ id: 'product-1', name: 'Product 1', price: 100 }]
      })
    );
  });
});
