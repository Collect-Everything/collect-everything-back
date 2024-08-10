import { describe, test, beforeEach } from "vitest";
import {
  ProductsFixture,
  createProductsFixture,
} from "../_fixtures/products-fixture";
import { Category } from "../../domain/category.entity";
import { CategoryAlreadyExistsError } from "./create-category.errors";

describe("Feature: Create Category", () => {
  let fixture: ProductsFixture;
  beforeEach(() => {
    fixture = createProductsFixture();
  });

  test("The company can create a category", async () => {
    fixture.givenPredefinedId("id-1");

    await fixture.whenCompanyCreatesCategory({
      name: "Vegetables",
    });

    fixture.thenCategoryShouldBe(
      Category.fromData({
        id: "id-1",
        name: "Vegetables",
      }),
    );
  });

  test("A category with the same name cannot be created", async () => {
    fixture.givenSomeCategories([
      Category.fromData({
        id: "id-1",
        name: "Vegetables",
      }),
    ]);
    fixture.givenPredefinedId("id-1");

    await fixture.whenCompanyCreatesCategory({
      name: "Vegetables",
    });

    fixture.thenErrorShouldBe(CategoryAlreadyExistsError);
  });
});
