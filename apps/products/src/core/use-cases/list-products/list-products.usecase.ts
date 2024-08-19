import { Ok } from "@ce/shared-core";
import { ProductRepository } from "../../ports/product.repository";
import { ListProductsQuery } from "./list-products.query";

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: ListProductsQuery) {
    const paginated = await this.productRepository.findAllPaginated({
      companyId: query.companyId,
      categoryId: query.categoryId,
      limit: query.limit,
      page: query.page,
    });

    return Ok.of({
      ...paginated,
      data: paginated.data.map((product) => product.data)
    });
  }
}
