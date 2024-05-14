export class EmailValidationNotFoundError extends Error {
  constructor() {
    super("Email validation not found");
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super("Invalid token");
  }
}

export class EmailValidationExpiredError extends Error {
  constructor() {
    super("Token expired");
  }
}
