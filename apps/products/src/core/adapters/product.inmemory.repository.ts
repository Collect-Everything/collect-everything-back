import { Product } from "../domain/product.entity";
import { ProductFilters } from "../ports/product.repository";

export class InMemoryProductRepository {
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
}
