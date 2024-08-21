import { OrderStatus, PaginatedQuery } from '@ce/shared-core';

export interface ListOrdersQuery extends PaginatedQuery {
  customerId?: string;
  statuses?: OrderStatus[];
}
