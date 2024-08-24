import { PrismaClient } from '@ce/db';
import { CompanyRepository } from '../ports/company.repository';
import { Company } from '../domain/company.entity';
import { CompanyMapper } from '../mappers/company.mapper';
import { PaginatedParams } from '@ce/shared-core';

export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly client: PrismaClient) {}

  async save(company: Company) {
    const data = CompanyMapper.toPersistence(company);

    await this.client.company.upsert({
      where: { id: data.id },
      update: data,
      create: data
    });
  }

  async findByNameOrEmail(name: string, email: string) {
    const raw = await this.client.company.findFirst({
      where: {
        name,
        email
      }
    });

    return raw ? CompanyMapper.toDomain(raw) : undefined;
  }

  async findByStoreSlug(storeSlug: string) {
    const raw = await this.client.company.findFirst({
      where: {
        storeSlug
      }
    });
    return raw ? CompanyMapper.toDomain(raw) : undefined;
  }

  async findById(id: string) {
    const raw = await this.client.company.findUnique({
      where: { id }
    });
    return raw ? CompanyMapper.toDomain(raw) : undefined;
  }

  async findAllPaginated(params: PaginatedParams) {
    const rawCompanies = await this.client.company.findMany({
      skip: (params.page - 1) * params.limit,
      take: params.limit
    });

    const companies = rawCompanies.map((raw) => CompanyMapper.toDomain(raw));

    return {
      data: companies,
      page: params.page,
      limit: params.limit,
      total: await this.client.company.count()
    };
  }

  async delete(id: string) {
    await this.client.company.delete({ where: { id } });
  }
}
