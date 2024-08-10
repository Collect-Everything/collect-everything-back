import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../ports/category.repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  categories: Category[] = [];
  async save(category: Category): Promise<void> {
    this.categories.push(category);
  }
  async findByName(name: string): Promise<Category | null> {
    return this.categories.find((c) => c.name === name) || null;
  }
}
