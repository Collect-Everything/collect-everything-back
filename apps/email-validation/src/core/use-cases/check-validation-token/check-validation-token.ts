import { Err, Ok, Result } from "@ce/shared-core";
import { EmailValidationRepository } from "../../ports/email-validation.repository";
import { CheckValidationTokenQuery } from "./check-validation-token.query";
import { DateProvider } from "../../ports/date-provider";
import {
  EmailValidationExpiredError,
  EmailValidationNotFoundError,
  InvalidTokenError,
} from "./check-validation-token.errors";

export interface CheckValidationTokenResponse {
  email: string;
  isValid: boolean;
}

export class CheckValidationTokenUseCase {
  constructor(
    private emailValidationRepository: EmailValidationRepository,
    private dateProvider: DateProvider,
  ) {}
  async execute(
    query: CheckValidationTokenQuery,
  ): Promise<
    Result<
      CheckValidationTokenResponse,
      | EmailValidationNotFoundError
      | InvalidTokenError
      | EmailValidationExpiredError
    >
  > {
    const emailValidation = await this.emailValidationRepository.findByToken(
      query.token,
    );

    if (!emailValidation) {
      return Err.of(new EmailValidationNotFoundError());
    }

    if (!emailValidation.isTokenValid(query.token)) {
      return Err.of(new InvalidTokenError());
    }

    if (emailValidation.isExpired(this.dateProvider.getNow())) {
      return Err.of(new EmailValidationExpiredError());
    }

    return Ok.of({ email: emailValidation.email, isValid: true });
  }
}
