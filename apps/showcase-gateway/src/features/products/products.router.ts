import { BaseRouter } from '@ce/server-core';
import { ProductsController } from './products.controller';
import { upload } from '../../lib/multer';

export class ProductsRouter extends BaseRouter {
  constructor(private readonly productsCtrl: ProductsController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post('/categories/', this.productsCtrl.createCategory);
    this.router.get('/categories/', this.productsCtrl.listCategories);
    this.router.patch('/categories/:categoryId', this.productsCtrl.updateCategory);
    this.router.delete('/categories/:categoryId', this.productsCtrl.deleteCategory);

    this.router.post('/', upload.single('image'), this.productsCtrl.createProduct);
    this.router.get('/', this.productsCtrl.listProducts);
    this.router.get('/:productId', this.productsCtrl.getProduct);
    this.router.patch('/:productId', this.productsCtrl.updateProduct);
    this.router.delete('/:productId', this.productsCtrl.deleteProduct);
  }
}
