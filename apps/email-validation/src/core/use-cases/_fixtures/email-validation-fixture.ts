import { expect } from "vitest";
import { InMemoryEmailValidationRepository } from "../../adapters/email-validation.inmemory.repository";
import { StubDateProvider } from "../../adapters/stub-date-provider";
import { StubEmailValidator } from "../../adapters/stub-email-validator";
import { StubIDProvider } from "../../adapters/stub-id-provider";
import { StubTokenProvider } from "../../adapters/stub-token-provider";
import { EmailValidation } from "../../domain/email-validation.entity";
import { SendValidationEmailUseCase } from "../send-validation-email/send-validation-email";

export const createEmailValidationFixture = () => {
  let emailSentTo: string;
  let thrownError: Error;

  const dateProvider = new StubDateProvider();
  const tokenProvider = new StubTokenProvider();
  const idProvider = new StubIDProvider();
  const emailValidator = new StubEmailValidator((email) => {
    emailSentTo = email;
  });

  const repository = new InMemoryEmailValidationRepository();

  const sendValidationEmailUseCase = new SendValidationEmailUseCase(
    repository,
    emailValidator,
    dateProvider,
    tokenProvider,
    idProvider,
  );

  return {
    givenNowIs: (now: Date) => {
      dateProvider.now = now;
    },
    givenTokenIs: (token: string) => {
      tokenProvider.token = token;
    },
    givenIDIs: (id: string) => {
      idProvider.id = id;
    },
    givenSomeEmailValidationExists: (emailValidations: EmailValidation[]) => {
      repository.emailValidations = emailValidations;
    },
    whenUserTryToValidateEmail: async (email: string) => {
      const result = await sendValidationEmailUseCase.execute({ email });

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    thenEmailShouldBeSentTo: async (expectedEmail: string) => {
      expect(emailSentTo).toBe(expectedEmail);
    },
    thenErrorShouldBe: (errorClass: new (...args: any) => Error) => {
      expect(thrownError).toBeInstanceOf(errorClass);
    },
    thenEmailValidationShouldExist: async (expected: EmailValidation) => {
      const emailValidation = await repository.findByEmail(expected.email);

      expect(emailValidation).toEqual(expected);
    },
    thenEmailValidationExpiresAtShouldBe: async (
      email: string,
      expected: Date,
    ) => {
      const emailValidation = await repository.findByEmail(email);

      expect(emailValidation?.expiresAt).toEqual(expected);
    },
  };
};

export type EmailValidationFixture = ReturnType<
  typeof createEmailValidationFixture
>;
