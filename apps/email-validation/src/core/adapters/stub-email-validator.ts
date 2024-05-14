import { EmailValidation } from "../domain/email-validation.entity";
import { EmailValidator } from "../ports/email-validator";

export class StubEmailValidator implements EmailValidator {
  constructor(public onSendConfirmationEmail: (email: string) => void) {}
  async sendConfirmationEmail(emailValidation: EmailValidation): Promise<void> {
    this.onSendConfirmationEmail(emailValidation.email);
  }
}
