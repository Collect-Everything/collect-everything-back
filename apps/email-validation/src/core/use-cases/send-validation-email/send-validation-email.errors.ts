export class EmailValidationAlreadySentError extends Error {
  constructor() {
    super("Email validation already sent");
  }
}
