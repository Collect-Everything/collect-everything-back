import { CartController } from "./cart.controller";
import { CartRouter } from "./cart.router";

const cartController = new CartController();

const cartRouter = new CartRouter(cartController).router;

export { cartRouter };
