import { PrismaClient } from '@ce/db';
import { CompanyCustomerRepository } from '../ports/company-customer.repository';
import { CompanyCustomer } from '../domain/company-customer.entity';
import { CompanyCustomerMapper } from '../mappers/company-customer.mapper';

export class PrismaCompanyCustomerRepository
  implements CompanyCustomerRepository
{
  constructor(private prisma: PrismaClient) {}

  async save(companyCustomer: CompanyCustomer): Promise<void> {
    const data = CompanyCustomerMapper.toPersistence(companyCustomer);
    await this.prisma.companyCustomer.upsert({
      where: { id: companyCustomer.id },
      update: {
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        company: {
          connect: { id: data.companyId }
        },
        emailVerified: data.emailVerified
      },
      create: {
        id: data.id,
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        company: {
          connect: { id: data.companyId }
        },
        emailVerified: data.emailVerified
      }
    });
  }

  async findByEmail(email: string): Promise<CompanyCustomer | null> {
    const raw = await this.prisma.companyCustomer.findFirst({
      where: { email }
    });

    return raw ? CompanyCustomerMapper.toDomain(raw) : null;
  }

  async findById(id: string): Promise<CompanyCustomer | null> {
    const raw = await this.prisma.companyCustomer.findUnique({
      where: { id }
    });
    return raw ? CompanyCustomerMapper.toDomain(raw) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.companyCustomer.delete({
      where: { id }
    });
  }
}
