import { Category } from "../domain/category.entity";
import {
  CategoriesFilters,
  CategoryRepository,
} from "../ports/category.repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  categories: Category[] = [];
  async save(category: Category): Promise<void> {
    this.categories.push(category);
  }
  async findByName(name: string): Promise<Category | null> {
    return this.categories.find((c) => c.name === name) || null;
  }
  async findById(id: string): Promise<Category | null> {
    return this.categories.find((c) => c.id === id) || null;
  }

  async findAll(filters?: CategoriesFilters) {
    return this.categories.filter((c) => {
      if (filters?.companyId && c.companyId !== filters.companyId) return false;
      if (filters?.categoryId && c.id !== filters.categoryId) return false;
      return true;
    });
  }
}
