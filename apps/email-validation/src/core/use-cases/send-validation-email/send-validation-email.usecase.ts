import { Result, Err, Ok } from "@ce/shared-core";
import { EmailValidator } from "../../ports/email-validator";
import { EmailValidation } from "../../domain/email-validation.entity";
import { DateProvider } from "../../ports/date-provider";
import { TokenProvider } from "../../ports/token-provider";
import { IDProvider } from "../../ports/id-provider";
import { EmailValidationRepository } from "../../ports/email-validation.repository";
import { SendValidationEmailCommand } from "./send-validation-email.command";
import { EmailValidationAlreadySentError } from "./send-validation-email.errors";

export class SendValidationEmailUseCase {
  constructor(
    private emailValidationRepository: EmailValidationRepository,
    private emailValidator: EmailValidator,
    private dateProvider: DateProvider,
    private tokenProvider: TokenProvider,
    private idProvider: IDProvider,
  ) { }
  async execute(
    command: SendValidationEmailCommand,
  ): Promise<Result<void, any>> {
    try {
      const emailValidation = EmailValidation.create({
        id: this.idProvider.provide(),
        callbackUrl: command.callbackUrl,
        email: command.email,
        token: this.tokenProvider.provide(),
        createdAt: this.dateProvider.getNow(),
      });

      const exists = await this.emailValidationRepository.findByEmail(
        command.email,
      );

      if (exists && !exists.isExpired(this.dateProvider.getNow())) {
        return Err.of(new EmailValidationAlreadySentError());
      }

      await this.emailValidator.sendConfirmationEmail(emailValidation);

      await this.emailValidationRepository.save(emailValidation);

      return Ok.of(undefined);
    } catch (error) {
      return Err.of(error);
    }
  }
}
