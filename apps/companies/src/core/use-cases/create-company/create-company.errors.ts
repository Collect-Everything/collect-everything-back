export class CompanyAlreadyExistsError extends Error {
  constructor() {
    super("Company already exists");
  }
}
