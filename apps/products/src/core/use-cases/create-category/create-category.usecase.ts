import { IdProvider, Ok, Result } from "@ce/shared-core";
import { CreateCategoryCommand } from "./create-category.command";
import { CategoryRepository } from "../../ports/category.repository";
import { Category } from "../../domain/category.entity";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly idProvider: IdProvider,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<Result<void, Error>> {
    const category = Category.fromData({
      id: this.idProvider.generate(),
      name: command.name,
    });

    await this.categoryRepository.save(category);

    return Ok.of(undefined);
  }
}
