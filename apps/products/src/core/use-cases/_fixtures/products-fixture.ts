import { expect } from "vitest";
import { CreateCategoryCommand } from "../create-category/create-category.command";
import { CreateCategoryUseCase } from "../create-category/create-category.usecase";
import { Category } from "../../domain/category.entity";
import { InMemoryCategoryRepository } from "../../adapters/category.inmemory.repository";
import { StubIdProvider } from "@ce/shared-core";

export const createProductsFixture = () => {
  const idProvider = new StubIdProvider();
  const categoryRepository = new InMemoryCategoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
    idProvider,
  );

  let thrownError: any;
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },
    givenSomeCategories: (categories: Category[]) => {
      categoryRepository.categories = categories;
    },
    whenCompanyCreatesCategory: async (command: CreateCategoryCommand) => {
      const result = await createCategoryUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    thenCategoryShouldBe: (expectedCategory: Category) => {
      const category = categoryRepository.categories.find(
        (c) => c.id === expectedCategory.id,
      );
      expect(category).toEqual(expectedCategory);
    },
    thenErrorShouldBe: (expectedError: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(expectedError);
    },
  };
};

export type ProductsFixture = ReturnType<typeof createProductsFixture>;
