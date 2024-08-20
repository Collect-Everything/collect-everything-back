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
import { CartResponseDto, GetCartUseCase } from '../get-cart/get-cart.usecase';
import { GetCartQuery } from '../get-cart/get-cart.query';

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

  const getCartUseCase = new GetCartUseCase(cartRepository);

  let thrownError: any;
  let cartResponse: CartResponseDto;
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
    whenUserGetsCart: async (query: GetCartQuery) => {
      const result = await getCartUseCase.execute(query);

      if (result.isErr()) {
        thrownError = result.error;
        return;
      }

      cartResponse = result.value;
    },
    thenCartIs: (expectedCart: Cart) => {
      const cart = cartRepository.carts.find(
        (cart) => cart.userId === expectedCart.userId
      );

      expect(cart).toEqual(expectedCart);
    },
    thenCartResponseIs: (expectedCart: CartResponseDto) => {
      expect(cartResponse).toEqual(expectedCart);
    }
  };
};
export type CartFixture = ReturnType<typeof createCartFixture>;
