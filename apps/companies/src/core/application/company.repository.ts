import { Company } from "../domain/company.entity";

export interface CompanyRepository {
  create: (data: Company) => Promise<null>;
}
