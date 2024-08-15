import { Err, IdProvider, Ok, Result } from "@ce/shared-core";
import { CreateCategoryCommand } from "./create-category.command";
import { CategoryRepository } from "../../ports/category.repository";
import { Category } from "../../domain/category.entity";
import { CategoryAlreadyExistsError } from "./create-category.errors";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly idProvider: IdProvider,
  ) {}

  async execute(
    command: CreateCategoryCommand,
  ): Promise<Result<{ categoryId: string }, Error>> {
    const categoryExists = await this.categoryRepository.findByName(
      command.name,
    );

    if (categoryExists) {
      return Err.of(new CategoryAlreadyExistsError(command.name));
    }

    const category = Category.fromData({
      id: this.idProvider.generate(),
      name: command.name,
    });

    await this.categoryRepository.save(category);

    return Ok.of({ categoryId: category.id });
  }
}
