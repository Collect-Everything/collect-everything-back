import { Product } from "../domain/product.entity";

export interface ProductFilters {
  companyId?: string;
  categoryId?: string;
}

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findAll(filters?: ProductFilters): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  delete(productId: string): Promise<void>;
}
