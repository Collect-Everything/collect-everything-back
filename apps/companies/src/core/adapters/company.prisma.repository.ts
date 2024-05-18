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

  async findByName(name: string) {
    const raw = await this.client.company.findFirst({
      where: {
        name,
      },
    });

    return raw ? CompanyMapper.toDomain(raw) : undefined;
  }
}
