import { EmailValidator } from "../ports/email-validator";

export class StubEmailValidator implements EmailValidator {
  constructor(public onSendConfirmationEmail: (email: string) => void) {}
  async sendConfirmationEmail(email: string): Promise<void> {
    this.onSendConfirmationEmail(email);
  }
}
