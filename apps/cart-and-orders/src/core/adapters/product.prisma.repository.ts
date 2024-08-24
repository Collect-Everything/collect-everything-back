import { PrismaClient } from '@ce/db';
import { ProductRepository } from '../ports/product.repository';
import { Product } from '../domain/product.entity';

export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    });
    return product
      ? Product.fromData({
          id: product.id,
          name: product.name,
          price: product.price
        })
      : null;
  }
}
