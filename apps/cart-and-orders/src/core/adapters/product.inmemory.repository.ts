import { OrderProduct } from '../domain/order-product.entity';
import { ProductRepository } from '../ports/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  products: OrderProduct[] = [];

  async findById(id: string) {
    return this.products.find((product) => product.id === id);
  }
}
