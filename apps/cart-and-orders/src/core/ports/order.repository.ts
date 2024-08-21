import {
  OrderStatus,
  PaginatedParams,
  PaginatedResponse
} from '@ce/shared-core';
import { Order } from '../domain/order.entity';

export interface OrderRepository {
  findById(id: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
  findAllPaginated(
    params: PaginatedParams & { customerId?: string; statuses?: OrderStatus[] }
  ): Promise<PaginatedResponse<Order>>;
}
