import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../ports/category.repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  categories: Category[] = [];
  async save(category: Category): Promise<void> {
    this.categories.push(category);
  }
}
