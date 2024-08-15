import { PrismaClient } from "@ce/db";
import { ProductFilters, ProductRepository } from "../ports/product.repository";
import { Product } from "../domain/product.entity";
import { Category } from "../domain/category.entity";

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(product: Product) {
    const p = product.data;
    await this.prisma.product.upsert({
      where: { id: product.id },
      update: {
        category: {
          connect: { id: p.category.id },
        },
        company: {
          connect: { id: p.companyId },
        },
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image,
        stock: p.stock,
        conditioning: p.conditioning,
        unity: p.unity,
        size: p.size,
      },
      create: {
        id: p.id,
        category: {
          connect: { id: p.category.id },
        },
        company: {
          connect: { id: p.companyId },
        },
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image,
        stock: p.stock,
        conditioning: p.conditioning,
        unity: p.unity,
        size: p.size,
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    if (!product) return null;
    return Product.fromData({
      id: product.id,
      companyId: product.companyId,
      category: Category.fromData({
        id: product.category.id,
        name: product.category.name,
      }),
      name: product.name,
      price: product.price,
      description: product.description ?? "",
      image: product.image ?? undefined,
      stock: product.stock,
      conditioning: product.conditioning,
      unity: product.unity,
      size: product.size ?? undefined,
    });
  }

  async findAll(filters?: ProductFilters) {
    const products = await this.prisma.product.findMany({
      where: {
        companyId: filters?.companyId,
        categoryId: filters?.categoryId,
      },
      include: {
        category: true,
      },
    });
    return products.map((product) =>
      Product.fromData({
        id: product.id,
        companyId: product.companyId,
        category: Category.fromData({
          id: product.category.id,
          name: product.category.name,
        }),
        name: product.name,
        price: product.price,
        description: product.description ?? "",
        image: product.image ?? undefined,
        stock: product.stock,
        conditioning: product.conditioning,
        unity: product.unity,
        size: product.size ?? undefined,
      }),
    );
  }

  async delete(productId: string) {
    await this.prisma.product.delete({
      where: { id: productId },
    });
  }
}
