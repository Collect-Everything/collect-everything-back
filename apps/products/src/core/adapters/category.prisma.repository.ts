import { PrismaClient } from "@ce/db";
import { CategoryRepository } from "../ports/category.repository";
import { Category } from "../domain/category.entity";

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async save(category: Category): Promise<void> {
    await this.prisma.productCategory.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: { id: category.id, name: category.name },
    });
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!category) return null;
    return Category.fromData({ id: category.id, name: category.name });
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.productCategory.findUnique({
      where: { name },
    });
    if (!category) return null;
    return Category.fromData({ id: category.id, name: category.name });
  }
}
