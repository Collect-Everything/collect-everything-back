import { ProductsController } from "./products.controller";
import { ProductsRouter } from "./products.router";

const productsController = new ProductsController();

const productsRouter = new ProductsRouter(productsController).router;

export { productsRouter };
