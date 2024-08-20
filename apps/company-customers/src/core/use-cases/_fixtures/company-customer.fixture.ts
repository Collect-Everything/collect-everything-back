import { expect } from 'vitest';
import { RegisterUseCase } from '../register/register.usecase';
import { RegisterCommand } from '../register/register.command';
import { CompanyCustomer } from '../../domain/company-customer.entity';
import { StubPasswordHasher } from '../../adapters/stub-password-hasher';
import { ValidateEmailUseCase } from '../validate-email/validate-email.usecase';
import { ValidateCredentialsQuery } from '../validate-credentials/validate-credentials.query';
import { ValidateCredentialsUseCase } from '../validate-credentials/validate-credentials.usecase';
import { UpdateUseCase } from '../update/update.usecase';
import { UpdateCommand } from '../update/update.command';
import { CompanyCustomerTokenPayload, StubIdProvider } from '@ce/shared-core';
import { DeleteCommand } from '../delete/delete.command';
import { DeleteUseCase } from '../delete/delete.usecase';
import { InMemoryCompanyCustomerRepository } from '../../adapters/company-customer.inmemory.repository';

export const createCompanyCustomerFixture = () => {
  const idProvider = new StubIdProvider();
  const passwordHasher = new StubPasswordHasher();
  const companyCustomerRepository = new InMemoryCompanyCustomerRepository();
  const registerUseCase = new RegisterUseCase(
    companyCustomerRepository,
    idProvider,
    passwordHasher
  );
  const validateEmailUseCase = new ValidateEmailUseCase(
    companyCustomerRepository
  );
  const validateCredentialsUseCase = new ValidateCredentialsUseCase(
    companyCustomerRepository,
    passwordHasher
  );
  const updateUseCase = new UpdateUseCase(companyCustomerRepository);
  const deleteUseCase = new DeleteUseCase(companyCustomerRepository);

  let thrownError: any;

  let returnedUser: CompanyCustomerTokenPayload | null = null;
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },
    givenSomeCompanyCustomers: (companyCustomers: CompanyCustomer[]) => {
      companyCustomerRepository.companyUsers = companyCustomers;
    },
    whenRegisteringCompanyCustomer: async (command: RegisterCommand) => {
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
    whenUpdatingCompanyCustomer: async (command: UpdateCommand) => {
      const result = await updateUseCase.execute(command);
      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenDeletingCompanyCustomer: async (command: DeleteCommand) => {
      const result = await deleteUseCase.execute(command);
      if (result.isErr()) {
        thrownError = result.error;
      }
    },

    thenCompanyUserShouldBe: async (expected: CompanyCustomer) => {
      const companyUser = await companyCustomerRepository.findById(expected.id);

      expect(companyUser).toEqual(expected);
    },
    thenCompanyUserShouldBeValidated: async (id: string) => {
      const companyUser = await companyCustomerRepository.findById(id);

      expect(companyUser?.isVerified).toBe(true);
    },
    thenShouldReturnUser: (expected: CompanyCustomerTokenPayload) => {
      expect(returnedUser).toEqual(expected);
    },
    thenCompanyUserShouldBeDeleted: async (id: string) => {
      const companyUser = await companyCustomerRepository.findById(id);

      expect(companyUser).toBeNull();
    },

    thenErrorShouldBe: (error: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(error);
    }
  };
};

export type CompanyUserFixture = ReturnType<
  typeof createCompanyCustomerFixture
>;
