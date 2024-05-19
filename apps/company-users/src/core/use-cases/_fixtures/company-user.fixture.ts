import { expect } from "vitest";
import { InMemoryCompanyUserRepository } from "../../adapters/company-user.inmemory.repository";
import { RegisterUseCase } from "../register/register.usecase";
import { RegisterCommand } from "../register/register.command";
import { CompanyUser } from "../../domain/company-user.entity";
import { StubIdProvider } from "../../adapters/stub-id-provider";
import { StubPasswordHasher } from "../../adapters/stub-password-hasher";

export const createCompanyUserFixture = () => {
  const idProvider = new StubIdProvider();
  const passwordHasher = new StubPasswordHasher();
  const repository = new InMemoryCompanyUserRepository();
  const registerUseCase = new RegisterUseCase(
    repository,
    idProvider,
    passwordHasher,
  );

  let thrownError: any;
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

    thenCompanyUserShouldBeRegistered: async (expected: CompanyUser) => {
      const companyUser = await repository.findById(expected.id);

      expect(companyUser).toEqual(expected);
    },

    thenErrorShouldBe: (error: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(error);
    },
  };
};

export type CompanyUserFixture = ReturnType<typeof createCompanyUserFixture>;
