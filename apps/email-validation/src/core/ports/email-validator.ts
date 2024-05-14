export interface EmailValidator {
  sendConfirmationEmail(email: string): Promise<void>;
}
