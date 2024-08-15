import { Ok } from "@ce/shared-core";
import { CategoryRepository } from "../../ports/category.repository";
import { ListCategoriesQuery } from "./list-categories.query";

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: ListCategoriesQuery) {
    const categories = await this.categoryRepository.findAll(query);

    return Ok.of(categories);
  }
}
