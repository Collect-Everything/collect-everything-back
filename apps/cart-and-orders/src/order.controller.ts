import {
  BadRequestError,
  BaseController,
  BaseResponse,
  BodyValidationError,
  NotFoundError,
  UnknownError,
  ctrlWrapper
} from '@ce/server-core';
import { GetOrderUseCase } from './core/use-cases/get-order/get-order.usecase';
import { UpdateOrderStatusUseCase } from './core/use-cases/update-order-status/update-order-status.usecase';
import { RequestHandler } from 'express';
import { OrderNotFoundError } from './core/errors/order-not-found';

export class OrderController extends BaseController {
  constructor(
    private getOrderUseCase: GetOrderUseCase,
    private updateOrderStatusUseCase: UpdateOrderStatusUseCase
  ) {
    super('order');
  }

  getOrder: RequestHandler = async (req, res) =>
    ctrlWrapper('getOrder', res, async () => {
      const orderId = req.params.orderId;

      if (!orderId) {
        throw new BadRequestError({ message: 'Missing orderId params' });
      }

      const query = { orderId };

      const result = await this.getOrderUseCase.execute(query);

      if (result.isErr()) {
        if (result.error instanceof OrderNotFoundError) {
          throw new NotFoundError({ message: 'Order not found' });
        }

        throw new UnknownError();
      }

      return {
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
    });

  updateOrderStatus: RequestHandler = async (req, res) =>
    ctrlWrapper('updateOrderStatus', res, async () => {
      const orderId = req.params.orderId;
      const status = req.body.status;
      if (!orderId) {
        throw new BadRequestError({ message: 'Missing orderId params' });
      }
      if (!status) {
        throw new BodyValidationError({ message: 'Missing status' });
      }
      const command = { orderId, status };
      const result = await this.updateOrderStatusUseCase.execute(command);
      if (result.isErr()) {
        if (result.error instanceof OrderNotFoundError) {
          throw new NotFoundError({ message: 'Order not found' });
        }
        throw new UnknownError();
      }
      return {
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
    });
}
