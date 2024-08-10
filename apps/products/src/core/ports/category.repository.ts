import { Category } from "../domain/category.entity";

export interface CategoryRepository {
  save(category: Category): Promise<void>;
}
