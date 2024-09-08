import { PaginatedParams } from "@ce/shared-core";
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

  async findAllPaginated(params: PaginatedParams & ProductFilters) {
    return {
      data: this.products.filter((product) => {
        if (params.companyId && product.companyId !== params.companyId) {
          return false;
        }
        if (params.categoryId && product.category.id !== params.categoryId) {
          return false;
        }
        return true;
      }),
      total: this.products.length,
      limit: 10,
      page: 1,
    };
  }

  async findById(id: string) {
    return this.products.find((product) => product.id === id) || null;
  }

  async delete(productId: string) {
    this.products = this.products.filter((product) => product.id !== productId);
  }
}
