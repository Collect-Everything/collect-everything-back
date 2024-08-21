import { EventsService } from '@ce/events';
import { BaseResponse, GatewayService } from '@ce/server-core';

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
}
