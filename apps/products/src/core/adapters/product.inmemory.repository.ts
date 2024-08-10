import { Product } from "../domain/product.entity";

export class InMemoryProductRepository {
  products: Product[] = [];
  async save(product: Product) {
    this.products.push(product);
  }
}
