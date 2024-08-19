import { Admin } from "../domain/admin.entity";

export interface AdminRepository {
    save(admin: Admin): Promise<void>;
    findByEmail(email: string): Promise<Admin | null>;
    findById(id: string): Promise<Admin | null>;
  }