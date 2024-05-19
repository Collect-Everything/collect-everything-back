import { CompanyUser } from "../domain/company-user.entity";

export class CompanyUserMapper {
  static toDomain(raw: any) {
    return CompanyUser.fromData({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      firstname: raw.firstname,
      lastname: raw.lastname,
      companyId: raw.companyId,
      role: raw.role,
    });
  }

  static toPersistence(domain: CompanyUser) {
    return {
      id: domain.id,
      email: domain.email,
      password: domain.data.password,
      firstname: domain.data.firstname,
      lastname: domain.data.lastname,
      companyId: domain.data.companyId,
      role: domain.data.role,
    };
  }
}
