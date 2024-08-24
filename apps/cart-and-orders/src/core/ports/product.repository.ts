import { OrderProduct } from '../domain/order-product.entity';

export interface ProductRepository {
  findById(id: string): Promise<OrderProduct | undefined>;
}
