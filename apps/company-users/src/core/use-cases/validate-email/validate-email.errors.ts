export class EmailAlreadyVerifiedError extends Error {
  constructor(email: string) {
    super(`Email ${email} is already verified`);
  }
}
