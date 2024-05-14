import { expect } from "vitest";
import { InMemoryCompanyRepository } from "../../adapters/company.in-memory.repository";
import { StubIDProvider } from "../../adapters/stub-id-provider";
import { Company } from "../../domain/company.entity";
import { CreateCompanyCommand } from "../create-company/create-company.command";
import { CreateCompanyUseCase } from "../create-company/create-company.usecase";
import { ConfigureStoreUseCase } from "../configure-store/configure-store.usecase";
import { ConfigureStoreCommand } from "../configure-store/configure-store.command";

export const createCompaniesFixture = () => {
  const idProvider = new StubIDProvider();
  const repository = new InMemoryCompanyRepository();

  const createCompanyUseCase = new CreateCompanyUseCase(repository, idProvider);
  const configureStoreUseCase = new ConfigureStoreUseCase(repository);

  let thrownError: any;
  return {
    givenPredefinedID: (id: string) => {
      idProvider.id = id;
    },
    givenSomeCompanies: async (companies: Company[]) => {
      repository.companies = companies;
    },
    whenUserCreatesCompany: async (command: CreateCompanyCommand) => {
      const result = await createCompanyUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenUserConfiguresStore: async (command: ConfigureStoreCommand) => {
      const result = await configureStoreUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    thenCompanyShouldBeCreated: async (expectedCompany: Company) => {
      const company = await repository.findById(expectedCompany.id);

      expect(company).toEqual(expectedCompany);
    },
    thenStoreShouldBeConfigured: async (expectedCompany: Company) => {
      const company = await repository.findById(expectedCompany.id);

      expect(company).toEqual(expectedCompany);
    },
    thenErrorShouldBe: (error: new (...args: any) => Error) => {
      expect(thrownError).toBeInstanceOf(error);
    },
  };
};

export type CompaniesFixture = ReturnType<typeof createCompaniesFixture>;
