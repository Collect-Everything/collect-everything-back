import { Err, Ok, Result } from '@ce/shared-core';
import { OrderRepository } from '../../ports/order.repository';
import { GetOrderQuery } from './get-order.query';
import { OrderNotFoundError } from '../../errors/order-not-found';
import { OrderSummary, ProductWithQuantity } from '../../domain/order.entity';

export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    query: GetOrderQuery
  ): Promise<Result<OrderSummary, OrderNotFoundError>> {
    const order = await this.orderRepository.findById(query.orderId);

    if (!order) {
      return Err.of(new OrderNotFoundError());
    }

    return Ok.of(order.summary);
  }
}
