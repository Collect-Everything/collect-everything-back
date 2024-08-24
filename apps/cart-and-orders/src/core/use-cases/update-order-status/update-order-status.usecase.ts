import { Err, Ok, Result } from '@ce/shared-core';
import { OrderRepository } from '../../ports/order.repository';
import { UpdateOrderStatusCommand } from './update-order-status.command';
import { OrderNotFoundError } from '../../errors/order-not-found';

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    command: UpdateOrderStatusCommand
  ): Promise<Result<void, OrderNotFoundError>> {
    const order = await this.orderRepository.findById(command.orderId);

    if (!order) {
      return Err.of(new OrderNotFoundError());
    }

    order.updateStatus(command.status);

    await this.orderRepository.save(order);

    return Ok.of(undefined);
  }
}
