import { beforeEach, test, describe } from "vitest";
import {
  ProductsFixture,
  createProductsFixture,
} from "../_fixtures/products-fixture";
import { Category } from "../../domain/category.entity";

describe("Feature: List Products", () => {
  let fixture: ProductsFixture;
  beforeEach(() => {
    fixture = createProductsFixture();
  });

  test("The company can list all of its categories", async () => {
    fixture.givenSomeCategories([
      Category.fromData({
        id: "id-1",
        name: "Vegetables",
        companyId: "id-1",
      }),
      Category.fromData({
        id: "id-2",
        name: "Fruits",
        companyId: "id-1",
      }),
      Category.fromData({
        id: "id-3",
        name: "Fruits",
        companyId: "id-2",
      }),
    ]);

    await fixture.whenListingCategories({
      companyId: "id-1",
    });

    fixture.thenListedCategoriesAre([
      Category.fromData({
        id: "id-1",
        name: "Vegetables",
        companyId: "id-1",
      }),
      Category.fromData({
        id: "id-2",
        name: "Fruits",
        companyId: "id-1",
      }),
    ]);
  });
});
