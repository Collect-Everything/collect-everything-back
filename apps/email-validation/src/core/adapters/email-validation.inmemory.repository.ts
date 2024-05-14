import { EmailValidation } from "../domain/email-validation.entity";
import { EmailValidationRepository } from "../ports/email-validation.repository";

export class InMemoryEmailValidationRepository
  implements EmailValidationRepository
{
  emailValidations: EmailValidation[] = [];

  async save(emailValidation: EmailValidation): Promise<void> {
    if (this.emailValidations.find((e) => e.email === emailValidation.email)) {
    } else {
      this.emailValidations.push(emailValidation);
    }
  }

  async findByEmail(email: string): Promise<EmailValidation | null> {
    return this.emailValidations.find((e) => e.email === email) ?? null;
  }
}
