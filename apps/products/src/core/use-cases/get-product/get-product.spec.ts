import { beforeEach, test, describe } from "vitest";
import {
  ProductsFixture,
  createProductsFixture,
} from "../_fixtures/products-fixture";
import { Category } from "../../domain/category.entity";
import { Product } from "../../domain/product.entity";

describe("Feature: Get Product", () => {
  let fixture: ProductsFixture;

  beforeEach(() => {
    fixture = createProductsFixture();
  });

  test("The company can get a product by its id", async () => {
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
      Product.fromData({
        id: "id-2",
        companyId: "id-1",
        category,
        name: "Potato",
        price: 150,
        description: "A yellow potato",
        image: "http://potato.com",
        stock: 5,
        conditioning: "unit",
        unity: "unit",
      }),
    ]);

    await fixture.whenGettingProduct({ productId: "id-1" });

    fixture.thenGottenProductIs(
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
    );
  });
});
