import { CompanyCustomer } from '../domain/company-customer.entity';

export class CompanyCustomerMapper {
  static toDomain(raw: any) {
    return CompanyCustomer.fromData({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      firstname: raw.firstname,
      lastname: raw.lastname,
      companyId: raw.companyId,
      emailVerified: raw.emailVerified
    });
  }

  static toPersistence(domain: CompanyCustomer) {
    return {
      id: domain.id,
      email: domain.email,
      password: domain.data.password,
      firstname: domain.data.firstname,
      lastname: domain.data.lastname,
      companyId: domain.data.companyId,
      emailVerified: domain.isVerified
    };
  }
}
