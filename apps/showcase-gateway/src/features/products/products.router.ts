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
    this.router.get('/:companyId', this.productsCtrl.listProducts);
  }
}
