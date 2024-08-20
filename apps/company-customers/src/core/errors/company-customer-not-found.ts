export class CompanyCustomerNotFoundError extends Error {
  constructor(companyCustomerId: string) {
    super(`CompanyCustomer ${companyCustomerId} not found`);
  }
}
