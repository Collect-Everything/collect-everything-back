import { Ok, PaginatedResponse, Result } from '@ce/shared-core';
import { OrderRepository } from '../../ports/order.repository';
import { ListOrdersQuery } from './list-orders.query';
import { OrderSummary } from '../../domain/order.entity';

export class ListOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    query: ListOrdersQuery
  ): Promise<Result<PaginatedResponse<OrderSummary>, Error>> {
    const paginated = await this.orderRepository.findAllPaginated({
      page: query.page,
      limit: query.limit,
      customerId: query.customerId,
      statuses: query.statuses
    });

    return Ok.of({
      ...paginated,
      data: paginated.data.map((order) => order.summary)
    });
  }
}
