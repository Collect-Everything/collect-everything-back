import { Admin } from "../domain/admin.entity";

export class AdminMapper {
  static toDomain(raw: any) {
    return Admin.fromData({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      firstname: raw.firstname,
      lastname: raw.lastname,
    });
  }

  static toPersistence(domain: Admin) {
    return {
      id: domain.id,
      email: domain.email,
      password: domain.data.password,
      firstname: domain.data.firstname,
      lastname: domain.data.lastname,
    };
  }
}
