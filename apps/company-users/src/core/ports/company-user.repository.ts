import { PaginatedParams, PaginatedResponse } from "@ce/shared-core";
import { CompanyUser } from "../domain/company-user.entity";

export interface CompanyUserRepository {
  save(companyUser: CompanyUser): Promise<void>;
  findByEmail(email: string): Promise<CompanyUser | null>;
  findById(id: string): Promise<CompanyUser | null>;
  delete: (id: string) => Promise<void>;
  countAdminsForCompany: (companyId: string) => Promise<number>;
  findAllPaginated(
    params: PaginatedParams
  ): Promise<PaginatedResponse<CompanyUser>>;
}
