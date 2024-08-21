import { PaginatedQuery } from '@ce/shared-core';
import { OrderStatus } from '../../domain/order.entity';

export interface ListOrdersQuery extends PaginatedQuery {
  customerId?: string;
  statuses?: OrderStatus[];
}
