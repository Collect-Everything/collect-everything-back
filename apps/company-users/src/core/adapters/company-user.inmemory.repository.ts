import { CompanyUserRepository } from "../ports/company-user.repository";
import { CompanyUser } from "../domain/company-user.entity";

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

  async findByEmail(email: string): Promise<CompanyUser | null> {
    return this.companyUsers.find((c) => c.email === email) || null;
  }

  async delete(id: string): Promise<void> {
    this.companyUsers = this.companyUsers.filter((c) => c.id !== id);
  }
}
