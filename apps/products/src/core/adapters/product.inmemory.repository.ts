import { Product } from "../domain/product.entity";
import { ProductFilters, ProductRepository } from "../ports/product.repository";

export class InMemoryProductRepository implements ProductRepository {
  products: Product[] = [];
  async save(product: Product) {
    this.products.push(product);
  }

  async findAll(filters: ProductFilters) {
    return this.products.filter((product) => {
      if (filters.companyId && product.companyId !== filters.companyId) {
        return false;
      }

      if (filters.categoryId && product.category.id !== filters.categoryId) {
        return false;
      }

      return true;
    });
  }

  async findById(id: string) {
    return this.products.find((product) => product.id === id) || null;
  }
}
