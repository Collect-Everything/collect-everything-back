export class CompanyAlreadyExistsError extends Error {
  static readonly code = 'COMPANY_ALREADY_EXISTS';
  static readonly message = 'Company with that email already exists';
  constructor() {
    super(CompanyAlreadyExistsError.message);
  }
}
