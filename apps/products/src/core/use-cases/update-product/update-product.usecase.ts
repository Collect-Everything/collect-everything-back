import { Err, Ok, withoutUndefinedProperties } from "@ce/shared-core";
import { ProductRepository } from "../../ports/product.repository";
import { UpdateProductCommand } from "./update-product.command";
import { ProductNotFoundError } from "../../errors/product-not-found";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(command: UpdateProductCommand) {
    const product = await this.productRepository.findById(command.productId);

    if (!product) {
      return Err.of(new ProductNotFoundError(command.productId));
    }

    product.update(
      withoutUndefinedProperties({
        name: command.name,
        price: command.price,
        description: command.description,
        image: command.image,
        conditioning: command.conditioning,
        size: command.size,
        stock: command.stock,
        unity: command.unity,
      }),
    );

    return Ok.of(undefined);
  }
}
