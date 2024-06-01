export interface CompanyRepository {
  countAdmins(companyId: string): Promise<number>;
}
