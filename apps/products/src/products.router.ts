import { BaseRouter } from "@ce/server-core";
import { ProductsController } from "./products.controller";

export class ProductsRouter extends BaseRouter {
  constructor(private controller: ProductsController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post("/categories", [], this.controller.createCategory);
    this.router.get("/categories", [], this.controller.listCategories);

    this.router.post("/products", [], this.controller.createProduct);
    this.router.get("/products", [], this.controller.listProducts);
    this.router.get("/products/:productId", [], this.controller.getProduct);
    this.router.patch("/products/:productId", [], this.controller.updateProduct);
    this.router.delete("/products/:productId", [], this.controller.deleteProduct);
  }
}
