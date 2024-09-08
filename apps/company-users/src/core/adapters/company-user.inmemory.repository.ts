import { CompanyUserRepository } from "../ports/company-user.repository";
import { CompanyUser } from "../domain/company-user.entity";
import { PaginatedParams } from "@ce/shared-core";

export class InMemoryCompanyUserRepository implements CompanyUserRepository {
  companyUsers: CompanyUser[] = [];

  async save(companyUser: CompanyUser): Promise<void> {
    const exists = await this.findById(companyUser.id);
    if (exists) {
      this.companyUsers = this.companyUsers.map((c) =>
        c.id === companyUser.id ? companyUser : c,
      );
    } else {
      this.companyUsers.push(companyUser);
    }
  }

  async findById(id: string): Promise<CompanyUser | null> {
    return this.companyUsers.find((c) => c.id === id) || null;
  }

  async findByEmail(email: string) {
    return this.companyUsers.filter((c) => c.email === email) || null;
  }

  async delete(id: string): Promise<void> {
    this.companyUsers = this.companyUsers.filter((c) => c.id !== id);
  }

  async countAdminsForCompany(companyId: string): Promise<number> {
    return this.companyUsers.filter(
      (c) => c.companyId === companyId && c.role === "ADMIN",
    ).length;
  }

  async findAllPaginated(
    params: PaginatedParams
  ) {
    return {
      data: this.companyUsers.filter((product) => {
        return true;
      }),
      total: this.companyUsers.length,
      limit: params.limit,
      page: params.page,
    };
  }
}
