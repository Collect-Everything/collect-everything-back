import { IdProvider, Ok, Result } from "@ce/shared-core";
import { CreateProductCommand } from "./create-product.command";
import { ProductRepository } from "../../ports/product.repository";
import { Product } from "../../domain/product.entity";

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly idProvider: IdProvider,
  ) {}
  async execute(command: CreateProductCommand): Promise<Result<void, Error>> {
    const product = Product.fromData({
      id: this.idProvider.generate(),
      name: command.name,
      price: command.price,
    });

    await this.productRepository.save(product);

    return Ok.of(undefined);
  }
}
