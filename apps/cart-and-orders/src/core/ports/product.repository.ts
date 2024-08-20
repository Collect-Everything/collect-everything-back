import { Product } from '../domain/product.entity';

export interface ProductRepository {
  findById(id: string): Promise<Product | undefined>;
}
