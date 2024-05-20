import { PrismaClient } from "@ce/db";
import { CompanyRepository } from "../ports/company.repository";
import { Company } from "../domain/company.entity";
import { CompanyMapper } from "../mappers/company.mapper";

export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private readonly client: PrismaClient) {}

  async save(company: Company) {
    const data = CompanyMapper.toPersistence(company);

    await this.client.company.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async findByNameOrEmail(name: string, email: string) {
    const raw = await this.client.company.findFirst({
      where: {
        name,
        email,
      },
    });

    return raw ? CompanyMapper.toDomain(raw) : undefined;
  }

  async findByStoreName(storeName: string) {
    const raw = await this.client.company.findFirst({
      where: {
        storeName,
      },
    });
    return raw ? CompanyMapper.toDomain(raw) : undefined;
  }

  async findById(id: string) {
    const raw = await this.client.company.findUnique({
      where: { id },
    });
    return raw ? CompanyMapper.toDomain(raw) : undefined;
  }
}
