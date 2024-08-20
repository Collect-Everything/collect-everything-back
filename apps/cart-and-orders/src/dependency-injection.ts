import { CartController } from './cart.controller';
import { CartRouter } from './cart.router';
import { PrismaCartRepository } from './core/adapters/cart.prisma.repository';
import { PrismaProductRepository } from './core/adapters/product.prisma.repository';
import { RealIDProvider } from './core/adapters/real-id-provider';
import { AddToCartUseCase } from './core/use-cases/add-to-cart/add-to-cart.usecase';
import { GetCartUseCase } from './core/use-cases/get-cart/get-cart.usecase';
import { RemoveFromCartUseCase } from './core/use-cases/remove-from-cart/remove-from-cart.usecase';
import { client } from './lib/db';

const cartRepository = new PrismaCartRepository(client);
const productRepository = new PrismaProductRepository(client);

const idProvider = new RealIDProvider();

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

const cartController = new CartController(
  addToCartUseCase,
  getCartUseCase,
  removeFromCartUseCase
);

const cartRouter = new CartRouter(cartController).router;

export { cartRouter };
