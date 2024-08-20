import { BaseRouter } from '@ce/server-core';
import { ProductsController } from './products.controller';

export class ProductsRouter extends BaseRouter {
  constructor(private readonly productsCtrl: ProductsController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post('/categories', this.productsCtrl.createCategory);
    this.router.get('/categories', this.productsCtrl.listCategories);

    this.router.post('/', this.productsCtrl.createProduct);
    this.router.get('/', this.productsCtrl.listProducts);
    this.router.get('/:productId', this.productsCtrl.getProduct);
    this.router.patch('/:productId', this.productsCtrl.updateProduct);
    this.router.delete('/:productId', this.productsCtrl.deleteProduct);
  }
}
