import { describe, test, beforeEach } from "vitest";
import {
  CompanyUserFixture,
  createCompanyUserFixture,
} from "../_fixtures/company-user.fixture";
import { CompanyUser } from "../../domain/company-user.entity";
import { CompanyUserNotFoundError } from "./update.errors";

describe("Update company user", () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyUserFixture();
  });

  test("informations are correct, it should update the company user", async () => {
    fixture.givenSomeCompanyUsers([
      CompanyUser.fromData({
        id: "id-1",
        email: "john.doe@gmail.com",
        password: "super-strong-password",
        firstname: "John",
        lastname: "Doe",
        companyId: "1",
        role: "ORDER_MANAGER",
      }),
    ]);

    await fixture.whenUpdatingCompanyUser({
      id: "id-1",
      role: "STOCK_MANAGER",
    });

    await fixture.thenCompanyUserShouldBe(
      CompanyUser.fromData({
        id: "id-1",
        email: "john.doe@gmail.com",
        password: "super-strong-password",
        firstname: "John",
        lastname: "Doe",
        companyId: "1",
        role: "STOCK_MANAGER",
      }),
    );
  });

  test("the user does not exist, it should throw an error", async () => {
    fixture.givenSomeCompanyUsers([]);

    await fixture.whenUpdatingCompanyUser({
      id: "id-1",
      role: "STOCK_MANAGER",
    });

    fixture.thenErrorShouldBe(CompanyUserNotFoundError);
  });
});
