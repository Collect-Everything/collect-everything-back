import {
  BaseController,
  BaseResponse,
  HttpException,
  ctrlWrapper
} from '@ce/server-core';
import { AddToCartUseCase } from './core/use-cases/add-to-cart/add-to-cart.usecase';
import { GetCartUseCase } from './core/use-cases/get-cart/get-cart.usecase';
import { RemoveFromCartUseCase } from './core/use-cases/remove-from-cart/remove-from-cart.usecase';
import { RequestHandler } from 'express';
import { ProductNotFoundError } from './core/errors/product-not-found';
import { CartNotFoundError } from './core/errors/cart-not-found';
import { ProductNotInCartError } from './core/use-cases/remove-from-cart/remove-from-cart.errors';

export class CartController extends BaseController {
  constructor(
    private addToCartUseCase: AddToCartUseCase,
    private getCartUseCase: GetCartUseCase,
    private removeFromCartUseCase: RemoveFromCartUseCase
  ) {
    super('cart');
  }

  addToCart: RequestHandler = async (req, res) =>
    ctrlWrapper('addToCart', res, async () => {
      const body = req.body;

      const command = {
        userId: body.userId,
        productId: body.productId,
        quantity: body.quantity
      };

      const result = await this.addToCartUseCase.execute(command);

      if (result.isErr()) {
        const error = result.error;

        if (error instanceof ProductNotFoundError) {
          throw new HttpException(400, 'Product not found');
        }

        throw new HttpException(500, 'Internal server error');
      }

      return {
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
    });

  getCart: RequestHandler = async (req, res) =>
    ctrlWrapper('getCart', res, async () => {
      const userId = req.params.userId;
      const result = await this.getCartUseCase.execute({ userId });

      if (result.isErr()) {
        const error = result.error;
        if (error instanceof CartNotFoundError) {
          throw new HttpException(400, 'Product not found');
        }

        throw new HttpException(500, 'Internal server error');
      }

      return {
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
    });

  removeFromCart: RequestHandler = async (req, res) =>
    ctrlWrapper('removeFromCart', res, async () => {
      const body = req.body;
      const command = {
        userId: body.userId,
        productId: body.productId,
        quantity: body.quantity
      };
      const result = await this.removeFromCartUseCase.execute(command);
      if (result.isErr()) {
        const error = result.error;
        if (error instanceof CartNotFoundError) {
          throw new HttpException(400, 'Product not found');
        }
        if (error instanceof ProductNotInCartError) {
          throw new HttpException(400, 'Product not in cart');
        }
        throw new HttpException(500, 'Internal server error');
      }

      return {
        status: 200,
        success: true,
        data: result.value
      } satisfies BaseResponse;
    });
}
