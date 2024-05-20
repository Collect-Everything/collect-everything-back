import { expect } from "vitest";
import { InMemoryCompanyUserRepository } from "../../adapters/company-user.inmemory.repository";
import { RegisterUseCase } from "../register/register.usecase";
import { RegisterCommand } from "../register/register.command";
import { CompanyUser } from "../../domain/company-user.entity";
import { StubIdProvider } from "../../adapters/stub-id-provider";
import { StubPasswordHasher } from "../../adapters/stub-password-hasher";
import { ValidateEmailUseCase } from "../validate-email/validate-email.usecase";
import { ValidateCredentialsQuery } from "../validate-credentials/validate-credentials.query";
import { ValidateCredentialsUseCase } from "../validate-credentials/validate-credentials.usecase";
import { ValidateCredentialsResponse } from "../validate-credentials/validate-credentials.response";

export const createCompanyUserFixture = () => {
  const idProvider = new StubIdProvider();
  const passwordHasher = new StubPasswordHasher();
  const repository = new InMemoryCompanyUserRepository();
  const registerUseCase = new RegisterUseCase(
    repository,
    idProvider,
    passwordHasher,
  );
  const validateEmailUseCase = new ValidateEmailUseCase(repository);
  const validateCredentialsUseCase = new ValidateCredentialsUseCase(
    repository,
    passwordHasher,
  );

  let thrownError: any;

  let returnedUser: ValidateCredentialsResponse | null = null;
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },
    givenSomeCompanyUsers: (companyUsers: CompanyUser[]) => {
      repository.companyUsers = companyUsers;
    },
    whenRegisteringCompanyUser: async (command: RegisterCommand) => {
      const result = await registerUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenValidatingEmail: async (email: string) => {
      const result = await validateEmailUseCase.execute({ email });

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenValidatingCredentials: async (query: ValidateCredentialsQuery) => {
      const result = await validateCredentialsUseCase.execute(query);
      if (result.isErr()) {
        thrownError = result.error;
      } else {
        returnedUser = result.value;
      }
    },

    thenCompanyUserShouldBeRegistered: async (expected: CompanyUser) => {
      const companyUser = await repository.findById(expected.id);

      expect(companyUser).toEqual(expected);
    },
    thenCompanyUserShouldBeValidated: async (id: string) => {
      const companyUser = await repository.findById(id);

      expect(companyUser?.isVerified).toBe(true);
    },
    thenShouldReturnUser: (expected: ValidateCredentialsResponse) => {
      expect(returnedUser).toEqual(expected);
    },

    thenErrorShouldBe: (error: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(error);
    },
  };
};

export type CompanyUserFixture = ReturnType<typeof createCompanyUserFixture>;
