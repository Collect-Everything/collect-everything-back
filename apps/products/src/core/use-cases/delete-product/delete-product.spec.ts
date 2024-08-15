import { beforeEach, test, describe } from "vitest";
import {
  ProductsFixture,
  createProductsFixture,
} from "../_fixtures/products-fixture";
import { Category } from "../../domain/category.entity";
import { Product } from "../../domain/product.entity";

describe("Feature: Delete Product", () => {
  let fixture: ProductsFixture;

  beforeEach(() => {
    fixture = createProductsFixture();
  });

  test("The company can delete one of its products", async () => {
    const category = Category.fromData({
      id: "id-1",
      name: "Vegetables",
      companyId: "id-1",
    });
    fixture.givenSomeCategories([category]);
    fixture.givenSomeProducts([
      Product.fromData({
        id: "id-1",
        companyId: "id-1",
        category,
        name: "Tomato",
        price: 250,
        description: "A red tomato",
        image: "http://tomato.com",
        stock: 10,
        conditioning: "unit",
        unity: "unit",
      }),
    ]);

    await fixture.whenDeletingProduct({
      productId: "id-1",
    });

    fixture.thenProductShouldNotExist("id-1");
  });
});
