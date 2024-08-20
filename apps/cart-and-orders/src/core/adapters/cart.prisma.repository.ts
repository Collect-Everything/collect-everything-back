import { PrismaClient } from '@ce/db';
import { CartRepository } from '../ports/cart.repository';
import { Cart } from '../domain/cart.entity';
import { Product } from '../domain/product.entity';

export class PrismaCartRepository implements CartRepository {
  constructor(private prisma: PrismaClient) {}

  async save(cart: Cart) {
    await this.prisma.order.upsert({
      where: { id: cart.id },

      create: {
        id: cart.id,
        status: 'CART',
        customer: {
          connect: { id: cart.customerId }
        },
        orderProducts: {
          connect: cart.products.map((product) => ({
            id: product.id
          }))
        }
      },
      update: {
        orderProducts: {
          set: cart.products.map((product) => ({
            id: product.id
          }))
        }
      }
    });
  }

  async findByUserId(userId: string) {
    const rawCart = await this.prisma.order.findFirst({
      where: {
        status: 'CART',
        customerId: userId
      },
      include: {
        orderProducts: {
          include: {
            product: true
          }
        }
      }
    });

    if (!rawCart) {
      return undefined;
    }

    const cart = Cart.fromData({
      id: rawCart.id,
      customerId: rawCart.customerId,
      products: []
    });

    for (const orderProduct of rawCart.orderProducts) {
      for (let i = 0; i < orderProduct.quantity; i++) {
        const product = Product.fromData({
          id: orderProduct.product.id,
          name: orderProduct.product.name,
          price: orderProduct.product.price
        });
        cart.addProduct(product);
      }
    }

    return cart;
  }
}
