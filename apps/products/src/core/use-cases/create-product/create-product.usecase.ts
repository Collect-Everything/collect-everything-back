import { Err, IdProvider, Ok, Result } from "@ce/shared-core";
import { CreateProductCommand } from "./create-product.command";
import { ProductRepository } from "../../ports/product.repository";
import { Product } from "../../domain/product.entity";
import { CategoryRepository } from "../../ports/category.repository";
import { CategoryNotFoundError } from "../../errors/category-not-found";

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly idProvider: IdProvider,
  ) { }
  async execute(
    command: CreateProductCommand,
  ): Promise<Result<{ productId: string }, Error>> {
    console.log("COMMAND : ", command)
    const category = await this.categoryRepository.findById(command.categoryId);

    if (!category) {
      return Err.of(new CategoryNotFoundError(command.categoryId));
    }

    const product = Product.fromData({
      id: this.idProvider.generate(),
      companyId: category.companyId,
      category,
      name: command.name,
      price: command.price,
      description: command.description,
      image: command.image,
      conditioning: command.conditioning,
      size: command.size,
      stock: command.stock,
      unity: command.unity,
    });

    await this.productRepository.save(product);

    return Ok.of({ productId: product.id });
  }
}
