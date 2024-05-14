import { EmailValidation } from "../domain/email-validation.entity";

export interface EmailValidationRepository {
  save(emailValidation: EmailValidation): Promise<void>;
  findByEmail(email: string): Promise<EmailValidation | null>;
}
