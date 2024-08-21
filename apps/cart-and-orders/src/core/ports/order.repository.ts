import { Order } from '../domain/order.entity';

export interface OrderRepository {
  findById(id: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
}
