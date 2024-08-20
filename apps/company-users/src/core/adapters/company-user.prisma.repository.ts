import { PrismaClient } from "@ce/db";
import { CompanyUserRepository } from "../ports/company-user.repository";
import { CompanyUser } from "../domain/company-user.entity";
import { CompanyUserMapper } from "../mappers/company-user.mapper";
import { PaginatedParams, PaginatedResponse } from "@ce/shared-core";

export class PrismaCompanyUserRepository implements CompanyUserRepository {
  constructor(private prisma: PrismaClient) {}

  async save(companyUser: CompanyUser): Promise<void> {
    const data = CompanyUserMapper.toPersistence(companyUser);
    await this.prisma.companyUser.upsert({
      where: { id: companyUser.id },
      update: {
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
        company: {
          connect: { id: data.companyId },
        },
        emailVerified: data.emailVerified,
      },
      create: {
        id: data.id,
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
        company: {
          connect: { id: data.companyId },
        },
        emailVerified: data.emailVerified,
      },
    });
  }

  async findByEmail(email: string): Promise<CompanyUser | null> {
    const raw = await this.prisma.companyUser.findUnique({
      where: { email },
    });

    return raw ? CompanyUserMapper.toDomain(raw) : null;
  }

  async findById(id: string): Promise<CompanyUser | null> {
    const raw = await this.prisma.companyUser.findUnique({
      where: { id },
    });
    return raw ? CompanyUserMapper.toDomain(raw) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.companyUser.delete({
      where: { id },
    });
  }

  async countAdminsForCompany(companyId: string): Promise<number> {
    return this.prisma.companyUser.count({
      where: { companyId, role: "ADMIN" },
    });
  }

  async findAllPaginated(params: PaginatedParams): Promise<PaginatedResponse<CompanyUser>> {
    const rawCompanyUsers = await this.prisma.companyUser.findMany({
      skip: (params.page - 1) * params.limit,
      take: params.limit
    });

    const companyUsers = rawCompanyUsers.map((raw) => CompanyUserMapper.toDomain(raw));

    return {
      data: companyUsers,
      page: params.page,
      limit: params.limit,
      total: await this.prisma.company.count()
    };
  }
}
