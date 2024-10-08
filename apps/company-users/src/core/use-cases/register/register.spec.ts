import { describe, test, beforeEach } from "vitest";
import { CompanyUser } from "../../domain/company-user.entity";
import {
  CompanyUserFixture,
  createCompanyUserFixture,
} from "../_fixtures/company-user.fixture";
import { EmailAlreadyTakenError } from "./register.errors";

describe("Create company user", () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyUserFixture();
  });

  test("informations are correct, it should create the company user", async () => {
    fixture.givenPredefinedId("id-1");

    await fixture.whenRegisteringCompanyUser({
      email: "johndoe@gmail.com",
      password: "Qwert123",
      firstname: "John",
      lastname: "Doe",
      companyId: "1",
      role: "ADMIN",
    });

    await fixture.thenCompanyUserShouldBe(
      CompanyUser.fromData({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "hashed-Qwert123",
        firstname: "John",
        lastname: "Doe",
        companyId: "1",
        role: "ADMIN",
        emailVerified: false,
      }),
    );
  });

  test("user with the same email already exists, it should throw an error", async () => {
    fixture.givenPredefinedId("id-1");

    fixture.givenSomeCompanyUsers([
      CompanyUser.fromData({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "hashed-Qwert123",
        firstname: "John",
        lastname: "Doe",
        companyId: "1",
        role: "ADMIN",
      }),
    ]);

    await fixture.whenRegisteringCompanyUser({
      email: "johndoe@gmail.com",
      password: "Qwert123",
      firstname: "John",
      lastname: "Doe",
      companyId: "1",
      role: "ADMIN",
    });

    fixture.thenErrorShouldBe(EmailAlreadyTakenError);
  });
});
