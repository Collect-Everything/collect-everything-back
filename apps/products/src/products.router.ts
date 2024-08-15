import { BaseRouter } from "@ce/server-core";
import { ProductsController } from "./products.controller";

export class ProductsRouter extends BaseRouter {
  constructor(private controller: ProductsController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post("/category", [], this.controller.createCategory);
    this.router.post("/product", [], this.controller.createProduct);
    this.router.get("/products", [], this.controller.listProducts);
    this.router.get("/product/:id", [], this.controller.getProduct);
    this.router.put("/product/:id", [], this.controller.updateProduct);
    this.router.delete("/product/:id", [], this.controller.deleteProduct);
  }
}
