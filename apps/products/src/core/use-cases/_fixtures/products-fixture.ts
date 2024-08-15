import { expect } from "vitest";
import { CreateCategoryCommand } from "../create-category/create-category.command";
import { CreateCategoryUseCase } from "../create-category/create-category.usecase";
import { Category } from "../../domain/category.entity";
import { InMemoryCategoryRepository } from "../../adapters/category.inmemory.repository";
import { StubIdProvider } from "@ce/shared-core";
import { InMemoryProductRepository } from "../../adapters/product.inmemory.repository";
import { CreateProductUseCase } from "../create-product/create-product.usecase";
import { Product } from "../../domain/product.entity";
import { CreateProductCommand } from "../create-product/create-product.command";
import { ListProductsUseCase } from "../list-products/list-products.usecase";
import { ListProductsQuery } from "../list-products/list-products.query";

export const createProductsFixture = () => {
  const idProvider = new StubIdProvider();
  const categoryRepository = new InMemoryCategoryRepository();
  const productRepository = new InMemoryProductRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
    idProvider,
  );
  const createProductUseCase = new CreateProductUseCase(
    productRepository,
    categoryRepository,
    idProvider,
  );
  const listProductsUseCase = new ListProductsUseCase(productRepository);

  let thrownError: any;
  let listedProducts: Product[] = [];
  return {
    givenPredefinedId: (id: string) => {
      idProvider.id = id;
    },
    givenSomeCategories: (categories: Category[]) => {
      categoryRepository.categories = categories;
    },
    givenSomeProducts: (products: Product[]) => {
      productRepository.products = products;
    },
    whenCompanyCreatesCategory: async (command: CreateCategoryCommand) => {
      const result = await createCategoryUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenCompanyCreatesProduct: async (command: CreateProductCommand) => {
      const result = await createProductUseCase.execute(command);

      if (result.isErr()) {
        thrownError = result.error;
      }
    },
    whenListingsProducts: async (query: ListProductsQuery) => {
      const result = await listProductsUseCase.execute(query);

      if (result.isErr()) {
        thrownError = result.error;
      }

      listedProducts = result.value;
    },
    thenCategoryShouldBe: (expectedCategory: Category) => {
      const category = categoryRepository.categories.find(
        (c) => c.id === expectedCategory.id,
      );
      expect(category).toEqual(expectedCategory);
    },
    thenProductShouldBe: (expectedProduct: Product) => {
      const product = productRepository.products.find(
        (p) => p.id === expectedProduct.id,
      );
      expect(product).toEqual(expectedProduct);
    },
    thenListedProductsAre: (expectedProducts: Product[]) => {
      expect(listedProducts).toEqual(expectedProducts);
    },
    thenErrorShouldBe: (expectedError: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(expectedError);
    },
  };
};

export type ProductsFixture = ReturnType<typeof createProductsFixture>;
