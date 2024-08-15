export class CompanyNotFoundError extends Error {
  constructor(companyId: string) {
    super(`Company ${companyId} not found`);
  }
}
