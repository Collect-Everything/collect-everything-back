import { Admin } from "../domain/admin.entity";

export interface AdminRepository {
    findByEmail(email: string): Promise<Admin | null>;
    findById(id: string): Promise<Admin | null>;
  }