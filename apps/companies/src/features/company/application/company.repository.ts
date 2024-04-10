import { CreateCompany } from "../dto";
import { CompanyModel } from "../model/company.model";

export interface CompanyRepository {
  create: (data: CreateCompany) => Promise<CompanyModel>;
}
