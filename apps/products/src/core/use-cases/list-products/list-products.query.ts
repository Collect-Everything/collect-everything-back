import { PaginatedQuery } from "@ce/shared-core";

export interface ListProductsQuery extends PaginatedQuery {
  companyId?: string;
  categoryId?: string;
}
