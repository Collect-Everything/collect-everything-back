import { expect } from "vitest";
import { InMemoryAdminRepository } from "../../adapters/admin.inmemory.repository";
import { RegisterUseCase } from "../register/register.usecase";
import { RegisterCommand } from "../register/register.command";
import { Admin } from "../../domain/admin.entity";
import { StubIdProvider } from "../../adapters/stub-id-provider";
import { StubPasswordHasher } from "../../adapters/stub-password-hasher";
import { ValidateCredentialsQuery } from "../validate-credentials/validate-credentials.query";
import { ValidateCredentialsUseCase } from "../validate-credentials/validate-credentials.usecase";
import { AdminTokenPayload } from "@ce/shared-core";

export const createAdminFixture = () => {
  const idProvider = new StubIdProvider();
  const passwordHasher = new StubPasswordHasher();
  const adminRepository = new InMemoryAdminRepository();
  const registerUseCase = new RegisterUseCase(
    adminRepository,
    idProvider,
    passwordHasher,
  );

  let thrownError: any;

  let returnedUser: AdminTokenPayload | null = null;
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },
    givenSomeAdmins: (admins: Admin[]) => {
      adminRepository.admins = admins;
    },
    whenRegisteringAdmin: async (command: RegisterCommand) => {
      const result = await registerUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenValidatingCredentials: async (query: ValidateCredentialsQuery) => {
      const result = await ValidateCredentialsUseCase.execute(query);
      if (result.isErr()) {
        thrownError = result.error;
      } else {
        returnedUser = result.value;
      }
    },

    thenAdminShouldBe: async (expected: Admin) => {
      const admin = await adminRepository.findById(expected.id);

      expect(admin).toEqual(expected);
    },
    thenShouldReturnUser: (expected: AdminTokenPayload) => {
      expect(returnedUser).toEqual(expected);
    },

    thenErrorShouldBe: (error: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(error);
    },
  };
};

export type AdminFixture = ReturnType<typeof createAdminFixture>;
