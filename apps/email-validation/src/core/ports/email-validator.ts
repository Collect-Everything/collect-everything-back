import { EmailValidation } from "../domain/email-validation.entity";

export interface EmailValidator {
  sendConfirmationEmail(emailValidation: EmailValidation): Promise<void>;
}
