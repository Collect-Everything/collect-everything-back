import {
  BadRequestError,
  GatewayController,
  ctrlWrapper
} from '@ce/server-core';
import { CartAndOrdersService } from './cart-and-orders.service';
import { RequestHandler } from 'express';
import { ORDER_STATUS, OrderStatus } from '@ce/shared-core';
import { ListQueryDto } from '../../dtos/list-orders.query.dto';

export class CartAndOrdersController extends GatewayController {
  constructor(private readonly cartAndOrdersService: CartAndOrdersService) {
    super('cart-and-orders');
  }

  getOrder: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getOrder'), res, async () => {
      const { orderId } = req.params;
      if (!orderId) {
        throw new BadRequestError({
          message: 'orderId is required to get order'
        });
      }
      const getOrderResult = await this.cartAndOrdersService.getOrder(
        orderId as string
      );
      if (getOrderResult.isErr()) {
        throw getOrderResult.error;
      }
      return {
        status: 200,
        success: true,
        data: getOrderResult.value.data
      };
    });

  updateOrderStatus: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('updateOrderStatus'), res, async () => {
      const { orderId } = req.params;
      const { status } = req.body;
      if (!orderId) {
        throw new BadRequestError({
          message: 'orderId is required to update order status'
        });
      }
      if (!status) {
        throw new BadRequestError({
          message: 'status is required to update order status'
        });
      }

      const statusResult = OrderStatus.safeParse(status);

      if (!statusResult.success) {
        throw new BadRequestError({
          message: `Invalid status, must be one of ${ORDER_STATUS.join(', ')}`
        });
      }
      const updateOrderStatusResult =
        await this.cartAndOrdersService.updateOrderStatus(
          orderId as string,
          status
        );
      if (updateOrderStatusResult.isErr()) {
        throw updateOrderStatusResult.error;
      }
      return {
        status: 200,
        success: true,
        data: updateOrderStatusResult.value.data
      };
    });

  listOrders: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('listOrders'), res, async () => {
      const queryResult = ListQueryDto.safeParse(req.query);

      if (!queryResult.success) {
        throw new BadRequestError({
          message: queryResult.error.errors.map((e) => e.message).join(', ')
        });
      }

      const listOrdersResult = await this.cartAndOrdersService.listOrders(
        queryResult.data
      );
      if (listOrdersResult.isErr()) {
        throw listOrdersResult.error;
      }
      return {
        status: 200,
        success: true,
        data: listOrdersResult.value.data
      };
    });
}
