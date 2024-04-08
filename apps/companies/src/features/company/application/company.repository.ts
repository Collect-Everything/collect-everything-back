import { CreateCompany } from "@ce/shared-core";

export interface CompanyRepository {
  create: (data: CreateCompany) => Promise<void>;
}
