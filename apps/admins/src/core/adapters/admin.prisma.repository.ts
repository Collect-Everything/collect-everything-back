import { Admin } from './../domain/admin.entity';
import { PrismaClient } from "@ce/db";
import { AdminRepository } from "../ports/admin.repository";
import { AdminMapper } from "../mappers/admin.mapper";
import { PaginatedParams, PaginatedResponse } from '@ce/shared-core';

export class PrismaAdminRepository implements AdminRepository {
  constructor(private prisma: PrismaClient) {}

  async save(admin: Admin): Promise<void> {
    const data = AdminMapper.toPersistence(admin);
    await this.prisma.admin.upsert({
      where: { id: admin.id },
      update: {
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
      },
      create: {
        id: data.id,
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
      },
    });
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const raw = await this.prisma.admin.findUnique({
      where: { email },
    });

    return raw ? AdminMapper.toDomain(raw) : null;
  }

  async findById(id: string): Promise<Admin | null> {
    const raw = await this.prisma.admin.findUnique({
      where: { id },
    });
    return raw ? AdminMapper.toDomain(raw) : null;
  }

  async findAllPaginated(params: PaginatedParams): Promise<PaginatedResponse<Admin>> {
    const rawAdmins = await this.prisma.admin.findMany({
      skip: (params.page - 1) * params.limit,
      take: params.limit
    });

    const admins = rawAdmins.map((raw) => AdminMapper.toDomain(raw));

    return {
      data: admins,
      page: params.page,
      limit: params.limit,
      total: await this.prisma.admin.count()
    };
  }
}
