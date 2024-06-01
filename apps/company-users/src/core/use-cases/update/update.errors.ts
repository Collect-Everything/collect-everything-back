export class CompanyUserNotFoundError extends Error {
  constructor() {
    super("Company user not found");
  }
}
