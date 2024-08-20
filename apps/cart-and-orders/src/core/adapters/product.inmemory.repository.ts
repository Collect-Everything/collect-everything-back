import { Product } from '../domain/product.entity';
import { ProductRepository } from '../ports/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  products: Product[] = [];

  async findById(id: string) {
    return this.products.find((product) => product.id === id);
  }
}
