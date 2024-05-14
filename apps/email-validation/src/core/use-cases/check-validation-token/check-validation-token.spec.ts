import { describe, test, beforeEach } from "vitest";
import {
  EmailValidationFixture,
  createEmailValidationFixture,
} from "../_fixtures/email-validation-fixture";
import { EmailValidation } from "../../domain/email-validation.entity";
import {
  EmailValidationExpiredError,
  EmailValidationNotFoundError,
} from "./check-validation-token.errors";

describe("Check Validation Token", () => {
  let fixture: EmailValidationFixture;

  beforeEach(() => {
    fixture = createEmailValidationFixture();
  });

  test("token is valid, it should return true", async () => {
    fixture.givenNowIs(new Date("2021-01-01T00:00:00Z"));
    fixture.givenSomeEmailValidationExists([
      EmailValidation.create({
        id: "id-1",
        email: "johndoe@gmail.com",
        token: "stub-token",
        createdAt: new Date("2021-01-01T00:02:00Z"),
      }),
    ]);

    await fixture.whenUserCheckValidationToken("stub-token");

    fixture.thenCheckValidationTokenResponseShouldBe({
      email: "johndoe@gmail.com",
      isValid: true,
    });
  });

  test("token is valid but email validation is expired, it should return error", async () => {
    fixture.givenNowIs(new Date("2021-01-01T00:20:01Z"));
    fixture.givenSomeEmailValidationExists([
      EmailValidation.create({
        id: "id-1",
        email: "johndoe@gmail.com",
        token: "stub-token",
        createdAt: new Date("2021-01-01T00:10:00Z"),
      }),
    ]);

    await fixture.whenUserCheckValidationToken("stub-token");

    fixture.thenErrorShouldBe(EmailValidationExpiredError);
  });

  test("token is invalid, it should return error", async () => {
    fixture.givenNowIs(new Date("2021-01-01T00:10:01Z"));
    fixture.givenSomeEmailValidationExists([
      EmailValidation.create({
        id: "id-1",
        email: "johndoe@gmail.com",
        token: "stub-token",
        createdAt: new Date("2021-01-01T00:10:00Z"),
      }),
    ]);

    await fixture.whenUserCheckValidationToken("invalid-token");

    fixture.thenErrorShouldBe(EmailValidationNotFoundError);
  });
});
