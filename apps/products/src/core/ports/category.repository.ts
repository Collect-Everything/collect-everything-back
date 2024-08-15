import { Category } from "../domain/category.entity";

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  findByName(name: string): Promise<Category | null>;
  findById(id: string): Promise<Category | null>;
}
