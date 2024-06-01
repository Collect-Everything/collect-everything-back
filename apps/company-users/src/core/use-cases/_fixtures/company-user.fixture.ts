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
import { UpdateUseCase } from "../update/update.usecase";
import { UpdateCommand } from "../update/update.command";
import { CompanyUserTokenPayload } from "@ce/shared-core";
import { DeleteCommand } from "../delete/delete.command";
import { DeleteUseCase } from "../delete/delete.usecase";
import { InMemoryCompanyRepository } from "../../adapters/company.inmemory.repository";

export const createCompanyUserFixture = () => {
  const idProvider = new StubIdProvider();
  const passwordHasher = new StubPasswordHasher();
  const companyUserRepository = new InMemoryCompanyUserRepository();
  const companyRepository = new InMemoryCompanyRepository();
  const registerUseCase = new RegisterUseCase(
    companyUserRepository,
    idProvider,
    passwordHasher,
  );
  const validateEmailUseCase = new ValidateEmailUseCase(companyUserRepository);
  const validateCredentialsUseCase = new ValidateCredentialsUseCase(
    companyUserRepository,
    passwordHasher,
  );
  const updateUseCase = new UpdateUseCase(companyUserRepository);
  const deleteUseCase = new DeleteUseCase(
    companyUserRepository,
    companyRepository,
  );

  let thrownError: any;

  let returnedUser: CompanyUserTokenPayload | null = null;
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },
    givenSomeCompanyUsers: (companyUsers: CompanyUser[]) => {
      companyUserRepository.companyUsers = companyUsers;
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
    whenUpdatingCompanyUser: async (command: UpdateCommand) => {
      const result = await updateUseCase.execute(command);
      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenDeletingCompanyUser: async (command: DeleteCommand) => {
      const result = await deleteUseCase.execute(command);
      if (result.isErr()) {
        thrownError = result.error;
      }
    },

    thenCompanyUserShouldBe: async (expected: CompanyUser) => {
      const companyUser = await companyUserRepository.findById(expected.id);

      expect(companyUser).toEqual(expected);
    },
    thenCompanyUserShouldBeValidated: async (id: string) => {
      const companyUser = await companyUserRepository.findById(id);

      expect(companyUser?.isVerified).toBe(true);
    },
    thenShouldReturnUser: (expected: CompanyUserTokenPayload) => {
      expect(returnedUser).toEqual(expected);
    },
    thenCompanyUserShouldBeDeleted: async (id: string) => {
      const companyUser = await companyUserRepository.findById(id);

      expect(companyUser).toBeNull();
    },

    thenErrorShouldBe: (error: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(error);
    },
  };
};

export type CompanyUserFixture = ReturnType<typeof createCompanyUserFixture>;
