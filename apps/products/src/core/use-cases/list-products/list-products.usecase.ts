import { Ok } from "@ce/shared-core";
import { ProductRepository } from "../../ports/product.repository";
import { ListProductsQuery } from "./list-products.query";

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: ListProductsQuery) {
    const products = await this.productRepository.findAll({
      companyId: query.companyId,
      categoryId: query.categoryId,
    });

    return Ok.of(products);
  }
}
