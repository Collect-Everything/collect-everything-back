import { Admin } from "../domain/admin.entity";

export interface AdminRepository {
  save(admin: Admin): Promise<void>;
  findById(id: string): Promise<Admin | null>;
  findByEmail(email: string): Promise<Admin | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Admin[]>;
}
