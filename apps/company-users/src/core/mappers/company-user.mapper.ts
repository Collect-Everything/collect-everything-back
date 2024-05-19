import { CompanyUser } from "../domain/company-user.entity";

export class CompanyUserMapper {
  static toDomain(raw: any): any {
    return CompanyUser.fromData({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      firstname: raw.firstname,
      lastname: raw.lastname,
      companyId: raw.companyId,
      roles: raw.roles,
    });
  }

  static toPersistence(domain: CompanyUser): any {
    return {
      id: domain.id,
      email: domain.email,
      password: domain.data.password,
      firstname: domain.data.firstname,
      lastname: domain.data.lastname,
      companyId: domain.data.companyId,
      roles: domain.data.roles,
    };
  }
}
