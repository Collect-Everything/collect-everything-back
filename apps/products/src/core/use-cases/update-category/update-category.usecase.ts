import { Err, Ok, withoutUndefinedProperties } from "@ce/shared-core";
import { CategoryRepository } from "../../ports/category.repository";
import { UpdateCategoryCommand } from "./update-category.command";
import { CategoryNotFoundError } from "../../errors/category-not-found";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(command: UpdateCategoryCommand) {
    const category = await this.categoryRepository.findById(command.categoryId);

    if (!category) {
      return Err.of(new CategoryNotFoundError(command.categoryId));
    }

    category.update(
      withoutUndefinedProperties({
        name: command.name,
      }),
    );

    await this.categoryRepository.save(category);

    return Ok.of(category);
  }
}
