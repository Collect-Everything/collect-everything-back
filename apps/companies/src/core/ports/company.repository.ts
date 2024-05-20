import { Company } from "../domain/company.entity";

export interface CompanyRepository {
  save(company: Company): Promise<void>;
  findByNameOrEmail(name: string, email: string): Promise<Company | undefined>;
  findById(id: string): Promise<Company | undefined>;
  findByStoreName(storeName: string): Promise<Company | undefined>;
}
