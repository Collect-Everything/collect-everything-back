import { PrismaClient } from '@ce/db';
import { OrderRepository } from '../ports/order.repository';
import { Order } from '../domain/order.entity';
import { Product } from '../domain/product.entity';
import { OrderStatus, PaginatedParams } from '@ce/shared-core';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    const rawOrder = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderProducts: {
          include: {
            product: true
          }
        }
      }
    });

    if (!rawOrder) {
      return undefined;
    }

    return this.rawToOrder(rawOrder);
  }

  async save(order: Order) {
    await this.prisma.order.upsert({
      where: { id: order.id },

      create: {
        id: order.id,
        status: order.status,
        customer: {
          connect: { id: order.customerId }
        },
        orderProducts: {
          connect: order.products.map((product) => ({
            id: product.id
          }))
        }
      },
      update: {
        orderProducts: {
          set: order.products.map((product) => ({
            id: product.id
          }))
        }
      }
    });
  }

  async delete(order: Order) {
    await this.prisma.order.delete({
      where: { id: order.id }
    });
  }

  async findAllPaginated(
    params: PaginatedParams & { customerId?: string; statuses?: OrderStatus[] }
  ) {
    const where = {
      customerId: params.customerId ?? undefined,
      status: params.statuses
        ? {
            in: params.statuses
          }
        : undefined
    };
    const rawOrders = await this.prisma.order.findMany({
      where,
      include: {
        orderProducts: {
          include: {
            product: true
          }
        }
      },
      skip: (params.page - 1) * params.limit,
      take: params.limit
    });

    const orders = rawOrders.map((rawOrder) => this.rawToOrder(rawOrder));

    return {
      data: orders,
      total: await this.prisma.order.count({
        where
      }),
      limit: params.limit,
      page: params.page
    };
  }

  private rawToOrder(rawOrder: any) {
    const products: Product[] = [];
    for (const orderProduct of rawOrder.orderProducts) {
      for (let i = 0; i < orderProduct.quantity; i++) {
        const product = Product.fromData({
          id: orderProduct.product.id,
          name: orderProduct.product.name,
          price: orderProduct.product.price
        });
        products.push(product);
      }
    }

    if (rawOrder.status === 'CART') {
      throw new Error('Order is in cart status');
    }

    return Order.fromData({
      id: rawOrder.id,
      status: rawOrder.status,
      customerId: rawOrder.customerId,
      products
    });
  }
}
