import { Category } from "../domain/category.entity";

export interface CategoriesFilters {
  companyId?: string;
  categoryId?: string;
}

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findAll(filters?: CategoriesFilters): Promise<Category[]>;
}
