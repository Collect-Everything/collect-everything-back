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
import { GetProductUseCase } from "../get-product/get-product.usecase";
import { GetProductQuery } from "../get-product/get-product.query";
import { UpdateProductUseCase } from "../update-product/update-product.usecase";
import { UpdateProductCommand } from "../update-product/update-product.command";

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
  const getProductUseCase = new GetProductUseCase(productRepository);
  const updateProductUseCase = new UpdateProductUseCase(productRepository);

  let thrownError: any;
  let listedProducts: Product[] = [];
  let gottenProduct: Product;
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
        return;
      }

      listedProducts = result.value;
    },
    whenGettingProduct: async (query: GetProductQuery) => {
      const result = await getProductUseCase.execute(query);

      if (result.isErr()) {
        thrownError = result.error;
        return;
      }

      gottenProduct = result.value;
    },
    whenUpdatingProduct: async (command: UpdateProductCommand) => {
      const result = await updateProductUseCase.execute(command);

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
    thenProductShouldBe: (expectedProduct: Product) => {
      const product = productRepository.products.find(
        (p) => p.id === expectedProduct.id,
      );
      expect(product).toEqual(expectedProduct);
    },
    thenListedProductsAre: (expectedProducts: Product[]) => {
      expect(listedProducts).toEqual(expectedProducts);
    },
    thenGottenProductIs: (expectedProduct: Product) => {
      expect(gottenProduct).toEqual(expectedProduct);
    },
    thenErrorShouldBe: (expectedError: new (...args: any[]) => Error) => {
      expect(thrownError).toBeInstanceOf(expectedError);
    },
  };
};

export type ProductsFixture = ReturnType<typeof createProductsFixture>;
