import { beforeEach, test, describe } from "vitest";
import {
  ProductsFixture,
  createProductsFixture,
} from "../_fixtures/products-fixture";
import { Product } from "../../domain/product.entity";
import { Category } from "../../domain/category.entity";

describe("Feature: List Products", () => {
  let fixture: ProductsFixture;
  beforeEach(() => {
    fixture = createProductsFixture();
  });

  test("The company can list all of its products", async () => {
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

    await fixture.whenListingsProducts({
      companyId: "id-1",
      page: 1,
      limit: 10
    });

    fixture.thenListedProductsAre([
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
  });

  test("The company can list all of its products by category", async () => {
    const category = Category.fromData({
      id: "id-1",
      name: "Vegetables",
      companyId: "id-1",
    });
    const category2 = Category.fromData({
      id: "id-2",
      name: "Fruits",
      companyId: "id-1",
    });
    fixture.givenSomeCategories([category, category2]);
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
      Product.fromData({
        id: "id-3",
        companyId: "id-1",
        category: category2,
        name: "Apple",
        price: 250,
        description: "A red apple",
        image: "http://apple.com",
        stock: 10,
        conditioning: "unit",
        unity: "unit",
      }),
    ]);

    await fixture.whenListingsProducts({
      companyId: "id-1",
      categoryId: "id-1",
      limit: 10,
      page: 1
    });

    fixture.thenListedProductsAre([
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
  });
});
