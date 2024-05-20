import { describe, test, beforeEach } from "vitest";
import {
  CompanyUserFixture,
  createCompanyUserFixture,
} from "../_fixtures/company-user.fixture";
import { CompanyUser } from "../../domain/company-user.entity";
import { InvalidCredentialsError } from "./valide-credentials.errors";

describe("Validate credentials", () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyUserFixture();
  });

  test("the user exists and the credentials are valid, it should return the user", async () => {
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

    await fixture.whenValidatingCredentials({
      email: "johndoe@gmail.com",
      password: "Qwert123",
    });

    fixture.thenShouldReturnUser({
      id: "id-1",
      email: "johndoe@gmail.com",
      firstname: "John",
      lastname: "Doe",
      companyId: "1",
      role: "ADMIN",
    });
  });

  test("the user does not exist, it should throw an error", async () => {
    await fixture.whenValidatingCredentials({
      email: "johndoe@gmail.com",
      password: "Qwert123",
    });

    fixture.thenErrorShouldBe(InvalidCredentialsError);
  });

  test("the user exist but the password does not correspond, it should throw an error", async () => {
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

    await fixture.whenValidatingCredentials({
      email: "johndoe@gmail.com",
      password: "Qwert1234",
    });

    fixture.thenErrorShouldBe(InvalidCredentialsError);
  });
});
