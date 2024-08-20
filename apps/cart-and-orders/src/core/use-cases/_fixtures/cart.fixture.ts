import { expect } from 'vitest';
import { AddToCartCommand } from '../add-to-cart/add-to-cart.command';
import { Cart } from '../../domain/cart.entity';
import { AddToCartUseCase } from '../add-to-cart/add-to-cart.usecase';
import { InMemoryProductRepository } from '../../adapters/product.inmemory.repository';
import { InMemoryCartRepository } from '../../adapters/cart.inmemory.repository';
import { StubIdProvider } from '@ce/shared-core';
import { Product } from '../../domain/product.entity';
import { RemoveFromCartUseCase } from '../remove-from-cart/remove-from-cart.usecase';
import { RemoveFromCartCommand } from '../remove-from-cart/remove-from-cart.command';

export const createCartFixture = () => {
  const cartRepository = new InMemoryCartRepository();
  const productRepository = new InMemoryProductRepository();
  const idProvider = new StubIdProvider();

  const addToCartUseCase = new AddToCartUseCase(
    cartRepository,
    productRepository,
    idProvider
  );

  const removeFromCartUseCase = new RemoveFromCartUseCase(
    cartRepository,
    productRepository
  );

  let thrownError: any;
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },
    givenSomeProductExists: (products: Product[]) => {
      productRepository.products = products;
    },
    givenSomeCartExists: (carts: Cart[]) => {
      cartRepository.carts = carts;
    },
    whenUserAddsProductToCart: async (command: AddToCartCommand) => {
      const result = await addToCartUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenUserRemovesProductFromCart: async (command: RemoveFromCartCommand) => {
      const result = await removeFromCartUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    thenCartIs: (expectedCart: Cart) => {
      const cart = cartRepository.carts.find(
        (cart) => cart.userId === expectedCart.userId
      );

      expect(cart).toEqual(expectedCart);
    }
  };
};
export type CartFixture = ReturnType<typeof createCartFixture>;
