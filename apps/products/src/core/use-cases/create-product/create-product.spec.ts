import { describe, test, beforeEach } from "vitest";
import {
  ProductsFixture,
  createProductsFixture,
} from "../_fixtures/products-fixture";
import { Product } from "../../domain/product.entity";

describe("Feature: Create Category", () => {
  let fixture: ProductsFixture;
  beforeEach(() => {
    fixture = createProductsFixture();
  });

  describe("Feature: Create Product", () => {
    test("The company can create a product", async () => {
      fixture.givenPredefinedId("id-1");

      await fixture.whenCompanyCreatesProduct({
        name: "Tomato",
        price: 250,
      });

      fixture.thenProductShouldBe(
        Product.fromData({
          id: "id-1",
          name: "Tomato",
          price: 250,
        }),
      );
    });
  });
});
