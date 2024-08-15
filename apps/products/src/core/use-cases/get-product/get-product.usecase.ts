import { Err, Ok } from "@ce/shared-core";
import { ProductRepository } from "../../ports/product.repository";
import { GetProductQuery } from "./get-product.query";
import { ProductNotFoundError } from "../../errors/product-not-found";

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(query: GetProductQuery) {
    const product = await this.productRepository.findById(query.productId);

    if (!product) {
      return Err.of(new ProductNotFoundError(query.productId));
    }

    return Ok.of(product);
  }
}
