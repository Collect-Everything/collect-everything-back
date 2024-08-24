import { PaginatedParams, PaginatedResponse } from "@ce/shared-core";
import { Admin } from "../domain/admin.entity";

export interface AdminRepository {
    save(admin: Admin): Promise<void>;
    findByEmail(email: string): Promise<Admin | null>;
    findById(id: string): Promise<Admin | null>;
    findAllPaginated(
      params: PaginatedParams
    ): Promise<PaginatedResponse<Admin>>;
  }