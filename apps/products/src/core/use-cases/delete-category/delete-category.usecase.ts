import { Err, Ok } from "@ce/shared-core";
import { CategoryRepository } from "../../ports/category.repository";
import { DeleteCategoryCommand } from "./delete-category.command";
import { CategoryNotFoundError } from "../../errors/category-not-found";

export class 
DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: DeleteCategoryCommand) {
    const category = await this.categoryRepository.findById(command.categoryId);

    if (!category) {
      return Err.of(new CategoryNotFoundError(command.categoryId));
    }

    await this.categoryRepository.delete(category.id);

    return Ok.of(undefined);
  }
}
