export class CompanyUserNotFoundError extends Error {
  constructor(email: string) {
    super(`Company user with email ${email} not found`);
  }
}

export class EmailAlreadyVerifiedError extends Error {
  constructor(email: string) {
    super(`Email ${email} is already verified`);
  }
}
