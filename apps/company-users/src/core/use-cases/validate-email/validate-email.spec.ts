import { describe, test, beforeEach } from "vitest";
import {
  CompanyUserFixture,
  createCompanyUserFixture,
} from "../_fixtures/company-user.fixture";
import { CompanyUser } from "../../domain/company-user.entity";
import {
  CompanyUserNotFoundError,
  EmailAlreadyVerifiedError,
} from "./validate-email.errors";

describe("Validate email", () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyUserFixture();
  });

  test("the user exists and his email is not validated yet, it should validate the email", async () => {
    fixture.givenSomeCompanyUsers([
      CompanyUser.fromData({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "hashed-Qwert123",
        firstname: "John",
        lastname: "Doe",
        companyId: "1",
        emailVerified: false,
        role: "ADMIN",
      }),
    ]);

    await fixture.whenValidatingEmail("johndoe@gmail.com");

    await fixture.thenCompanyUserShouldBeValidated("id-1");
  });

  test("the user does not exist, it should throw an error", async () => {
    await fixture.whenValidatingEmail("johndoe@gmail.com");

    fixture.thenErrorShouldBe(CompanyUserNotFoundError);
  });

  test("the user exists but his email is already validated, it should throw an error", async () => {
    fixture.givenSomeCompanyUsers([
      CompanyUser.fromData({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "hashed-Qwert123",
        firstname: "John",
        lastname: "Doe",
        companyId: "1",
        emailVerified: true,
        role: "ADMIN",
      }),
    ]);

    await fixture.whenValidatingEmail("johndoe@gmail.com");

    fixture.thenErrorShouldBe(EmailAlreadyVerifiedError);
  });
});
