import { PrismaClient } from "@ce/db";
import { CompanyUserRepository } from "../ports/company-user.repository";
import { CompanyUser } from "../domain/company-user.entity";
import { CompanyUserMapper } from "../mappers/company-user.mapper";

export class PrismaCompanyUserRepository implements CompanyUserRepository {
  constructor(private prisma: PrismaClient) {}

  async save(companyUser: CompanyUser): Promise<void> {
    const data = CompanyUserMapper.toPersistence(companyUser);
    await this.prisma.companyUser.upsert({
      where: { id: companyUser.id },
      update: data,
      create: data,
    });
  }

  async findByEmail(email: string): Promise<CompanyUser | null> {
    const raw = await this.prisma.companyUser.findUnique({
      where: { email },
    });

    return raw ? CompanyUserMapper.toDomain(raw) : null;
  }
}
