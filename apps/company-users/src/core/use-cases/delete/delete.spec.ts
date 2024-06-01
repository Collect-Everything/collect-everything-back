import { describe, test, beforeEach } from "vitest";
import {
  CompanyUserFixture,
  createCompanyUserFixture,
} from "../_fixtures/company-user.fixture";
import { CompanyUser } from "../../domain/company-user.entity";
import { CompanyUserNotFoundError } from "../../errors/company-user-not-found";
import { LastAdminError } from "./delete.errors";

describe("Delete company user", () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyUserFixture();
  });

  test("the user exists, it should delete the user", async () => {
    fixture.givenSomeCompanyUsers([
      CompanyUser.fromData({
        id: "id-1",
        email: "john.doe@gmail.com",
        firstname: "John",
        lastname: "Doe",
        password: "super-strong-password",
        role: "STOCK_MANAGER",
        companyId: "1",
      }),
    ]);

    await fixture.whenDeletingCompanyUser({ id: "id-1" });

    fixture.thenCompanyUserShouldBeDeleted("id-1");
  });

  test("the user does not exist, it should throw an error", async () => {
    fixture.givenSomeCompanyUsers([]);

    await fixture.whenDeletingCompanyUser({ id: "id-1" });

    fixture.thenErrorShouldBe(CompanyUserNotFoundError);
  });

  test("the user exists but it is the last admin, it should throw an error", async () => {
    fixture.givenSomeCompanyUsers([
      CompanyUser.fromData({
        id: "id-1",
        email: "john.doe@gmail.com",
        firstname: "John",
        lastname: "Doe",
        password: "super-strong-password",
        role: "ADMIN",
        companyId: "1",
      }),
    ]);

    await fixture.whenDeletingCompanyUser({ id: "id-1" });

    fixture.thenErrorShouldBe(LastAdminError);
  });

  test("the user is admin but there are other admins, it should delete the user", async () => {
    fixture.givenSomeCompanyUsers([
      CompanyUser.fromData({
        id: "id-1",
        email: "john.doe@gmail.com",
        firstname: "John",
        lastname: "Doe",
        password: "super-strong-password",
        role: "ADMIN",
        companyId: "1",
      }),
      CompanyUser.fromData({
        id: "id-2",
        email: "dwayne.johnson@gmail.com",
        firstname: "Dwayne",
        lastname: "Johnson",
        password: "super-strong-password",
        role: "ADMIN",
        companyId: "1",
      }),
    ]);

    await fixture.whenDeletingCompanyUser({ id: "id-1" });

    fixture.thenCompanyUserShouldBeDeleted("id-1");
  });
});
