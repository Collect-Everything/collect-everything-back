import { Product } from "../domain/product.entity";

export interface ProductRepository {
  save(product: Product): Promise<void>;
}
