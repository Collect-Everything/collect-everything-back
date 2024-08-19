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
    this.router.get("/products/:id", [], this.controller.getProduct);
    this.router.put("/products/:id", [], this.controller.updateProduct);
    this.router.delete("/products/:id", [], this.controller.deleteProduct);
  }
}
