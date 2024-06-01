import { OrdersController } from "./orders.controller";
import { OrdersRouter } from "./orders.router";

const ordersController = new OrdersController();

const ordersRouter = new OrdersRouter(ordersController).router;

export { ordersRouter };
