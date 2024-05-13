import { Company } from "../domain/company.entity";

export interface CompanyRepository {
  save(company: Company): Promise<void>;
  findByName(name: string): Promise<Company | undefined>;
}
