import { describe, test, beforeEach } from "vitest";
import {
  ProductsFixture,
  createProductsFixture,
} from "../_fixtures/products-fixture";
import { Product } from "../../domain/product.entity";
import { Category } from "../../domain/category.entity";

describe("Feature: Create Category", () => {
  let fixture: ProductsFixture;
  beforeEach(() => {
    fixture = createProductsFixture();
  });

  describe("Feature: Create Product", () => {
    test("The company can create a product", async () => {
      const category = new Category({
        id: "id-1",
        name: "Vegetables",
        companyId: "id-1",
      });

      fixture.givenPredefinedId("id-1");
      fixture.givenSomeCategories([category]);

      await fixture.whenCompanyCreatesProduct({
        categoryId: "id-1",
        name: "Tomato",
        price: 250,
        description: "A red tomato",
        image: "http://tomato.com",
        stock: 10,
        conditioning: "unit",
        unity: "unit",
      });

      fixture.thenProductShouldBe(
        Product.fromData({
          id: "id-1",
          companyId: "id-1",
          category: {
            id: "id-1",
            name: "Vegetables",
          },
          name: "Tomato",
          price: 250,
          description: "A red tomato",
          image: "http://tomato.com",
          stock: 10,
          conditioning: "unit",
          unity: "unit",
        }),
      );
    });
  });
});
