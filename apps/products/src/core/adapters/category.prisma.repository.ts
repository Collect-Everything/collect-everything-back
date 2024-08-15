import { PrismaClient } from "@ce/db";
import {
  CategoriesFilters,
  CategoryRepository,
} from "../ports/category.repository";
import { Category } from "../domain/category.entity";

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async save(category: Category): Promise<void> {
    await this.prisma.productCategory.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: {
        id: category.id,
        name: category.name,
        company: {
          connect: { id: category.companyId },
        },
      },
    });
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!category) return null;
    return Category.fromData({
      id: category.id,
      name: category.name,
      companyId: category.companyId,
    });
  }

  async findAll(categoriesFilters?: CategoriesFilters) {
    const categories = await this.prisma.productCategory.findMany({
      where: {
        companyId: categoriesFilters?.companyId,
      },
    });
    return categories.map((category) =>
      Category.fromData({
        id: category.id,
        name: category.name,
        companyId: category.companyId,
      }),
    );
  }
}
