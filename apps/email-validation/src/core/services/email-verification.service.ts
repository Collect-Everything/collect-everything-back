import { Result, Err, Ok } from "@ce/shared-core";
import { EmailValidator } from "../ports/email-validator";
import { EmailValidation } from "../domain/email-validation.entity";
import { DateProvider } from "../ports/date-provider";
import { TokenProvider } from "../ports/token-provider";
import { IDProvider } from "../ports/id-provider";
import { EmailValidationRepository } from "../ports/email-validation.repository";

export class EmailValidationService {
  constructor(
    private emailValidationRepository: EmailValidationRepository,
    private emailValidator: EmailValidator,
    private dateProvider: DateProvider,
    private tokenProvider: TokenProvider,
    private idProvider: IDProvider,
  ) {}
  async validate(email: string): Promise<Result<void, any>> {
    try {
      const emailValidationOrError = EmailValidation.create({
        id: this.idProvider.provide(),
        email: email,
        token: this.tokenProvider.provide(),
        createdAt: this.dateProvider.getNow(),
      });

      if (emailValidationOrError.isErr()) {
        return Err.of(emailValidationOrError.error);
      }

      await this.emailValidator.sendConfirmationEmail(email);

      await this.emailValidationRepository.save(emailValidationOrError.value);

      return Ok.of(undefined);
    } catch (error) {
      return Err.of(error);
    }
  }
}
