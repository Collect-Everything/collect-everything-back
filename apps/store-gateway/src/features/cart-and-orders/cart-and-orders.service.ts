import { EventsService } from '@ce/events';
import { BaseResponse, GatewayService } from '@ce/server-core';
import { OrderStatus } from '@ce/shared-core';
import { ListQueryDto } from '../../dtos/list-orders.query.dto';

export class CartAndOrdersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super('cart-and-orders', {
      gatewayName: 'STORE_GATEWAY',
      serviceName: 'CART_AND_ORDERS'
    });
  }

  async getOrder(orderId: string) {
    const handler = this.fetcher.post<BaseResponse>(`/orders/${orderId}`);

    return this.executeRequest(handler);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const handler = this.fetcher.patch<BaseResponse>(`/${orderId}/status`, {
      status
    });

    return this.executeRequest(handler);
  }

  async listOrders(params: ListQueryDto) {
    const queryString = `?page=${params.page}&limit=${params.limit}`;

    if (params.customerId) {
      queryString.concat(`&customerId=${params.customerId}`);
    }

    if (params.statuses) {
      queryString.concat(`&statuses={JSON.stringify(params.statuses}`);
    }
    const handler = this.fetcher.get<BaseResponse>(`/orders${queryString}`);

    return this.executeRequest(handler);
  }
}
