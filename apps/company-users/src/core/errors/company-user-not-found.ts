export class CompanyUserNotFoundError extends Error {
  constructor(companyUserId: string) {
    super(`CompanyUser ${companyUserId} not found`);
  }
}
