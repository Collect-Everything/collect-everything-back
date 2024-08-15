import { Err, Ok } from "@ce/shared-core";
import { ProductRepository } from "../../ports/product.repository";
import { DeleteProductCommand } from "./delete-product.command";
import { ProductNotFoundError } from "../../errors/product-not-found";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: DeleteProductCommand) {
    const product = await this.productRepository.findById(command.productId);

    if (!product) {
      return Err.of(new ProductNotFoundError(command.productId));
    }

    await this.productRepository.delete(product.id);

    return Ok.of(undefined);
  }
}
