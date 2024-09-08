import { EmailValidation } from "../domain/email-validation.entity";
import { EmailValidator } from "../ports/email-validator";
import { BrevoEmailService } from "../services/brevo-email-service";

export class BrevoEmailValidator implements EmailValidator {
  constructor(private brevoService: BrevoEmailService) { }
  async sendConfirmationEmail(emailValidation: EmailValidation): Promise<void> {
    const res = await this.brevoService.sendTemplate({
      templateKey: 'email-validation',
      to: emailValidation.email,
      params: {
        CALLBACK_URL: emailValidation.callbackUrl + `?token=${emailValidation.token}`,
      }
    })

    if (res.isErr()) {
      console.error(`Error sending email to ${emailValidation.email}: ${res.error.message}`);
      return;
    }

    console.log(`Sending email to ${emailValidation.email} with token ${emailValidation.token}`);
  }
}
