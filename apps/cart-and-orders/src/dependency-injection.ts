import { CartController } from './cart.controller';
import { CartRouter } from './cart.router';
import { PrismaCartRepository } from './core/adapters/cart.prisma.repository';
import { PrismaOrderRepository } from './core/adapters/order.prisma.repository';
import { PrismaProductRepository } from './core/adapters/product.prisma.repository';
import { RealIDProvider } from './core/adapters/real-id-provider';
import { AddToCartUseCase } from './core/use-cases/add-to-cart/add-to-cart.usecase';
import { DeleteOrderUseCase } from './core/use-cases/delete-order/delete-order.usecase';
import { GetCartUseCase } from './core/use-cases/get-cart/get-cart.usecase';
import { GetOrderUseCase } from './core/use-cases/get-order/get-order.usecase';
import { ListOrdersUseCase } from './core/use-cases/list-orders/list-orders.usecase';
import { RemoveFromCartUseCase } from './core/use-cases/remove-from-cart/remove-from-cart.usecase';
import { UpdateOrderStatusUseCase } from './core/use-cases/update-order-status/update-order-status.usecase';
import { client } from './lib/db';
import { OrderController } from './order.controller';
import { OrderRouter } from './order.router';

const cartRepository = new PrismaCartRepository(client);
const productRepository = new PrismaProductRepository(client);
const orderRepository = new PrismaOrderRepository(client);

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

const getOrderUserCase = new GetOrderUseCase(orderRepository);

const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);

const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);

const listOrdersUseCase = new ListOrdersUseCase(orderRepository);

const orderController = new OrderController(
  getOrderUserCase,
  updateOrderStatusUseCase,
  deleteOrderUseCase,
  listOrdersUseCase
);

const orderRouter = new OrderRouter(orderController).router;

export { cartRouter, orderRouter };
