import { Err, Ok, Result } from '@ce/shared-core';
import { OrderRepository } from '../../ports/order.repository';
import { DeleteOrderCommand } from './delete-order.command';
import { OrderNotFoundError } from '../../errors/order-not-found';

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    command: DeleteOrderCommand
  ): Promise<Result<void, OrderNotFoundError>> {
    const order = await this.orderRepository.findById(command.orderId);

    if (!order) {
      return Err.of(new OrderNotFoundError());
    }

    await this.orderRepository.delete(order);

    return Ok.of(undefined);
  }
}
