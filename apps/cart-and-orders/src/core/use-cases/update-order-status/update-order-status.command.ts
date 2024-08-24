import { OrderStatus } from '../../domain/order.entity';

export interface UpdateOrderStatusCommand {
  orderId: string;
  status: OrderStatus;
}
