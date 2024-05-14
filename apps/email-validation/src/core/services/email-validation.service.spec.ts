import { describe, test, beforeEach } from "vitest";
import { EmailValidation } from "../domain/email-validation.entity";
import { EntityValidationError } from "@ce/shared-core";
import {
  EmailValidationFixture,
  createEmailValidationFixture,
} from "../__tests__/email-validation-fixture";

describe("Validate Email", () => {
  let fixture: EmailValidationFixture;

  beforeEach(() => {
    fixture = createEmailValidationFixture();
  });

  test("email is valid, it should send a confirmation email", async () => {
    await fixture.whenUserTryToValidateEmail("johndoe@gmail.com");

    await fixture.thenEmailShouldBeSentTo("johndoe@gmail.com");
  });

  test("email is valid, it should save a emailValidation record", async () => {
    fixture.givenNowIs(new Date("2021-01-01T00:00:00Z"));
    fixture.givenTokenIs("stub-token");
    fixture.givenIDIs("id-1");
    await fixture.whenUserTryToValidateEmail("johndoe@gmail.com");

    await fixture.thenEmailValidationShouldExist(
      new EmailValidation({
        id: "id-1",
        email: "johndoe@gmail.com",
        token: "stub-token",
        createdAt: new Date("2021-01-01T00:00:00Z"),
      }),
    );
  });

  test("email validation expiresAt should be set to createdAt + 10 min", async () => {
    fixture.givenNowIs(new Date("2021-01-01T00:00:00Z"));
    fixture.givenTokenIs("stub-token");
    fixture.givenIDIs("id-1");
    await fixture.whenUserTryToValidateEmail("johndoe@gmail.com");

    await fixture.thenEmailValidationExpiresAtShouldBe(
      "johndoe@gmail.com",
      new Date("2021-01-01T00:10:00Z"),
    );
  });

  test("email is not valid, it should throw an error", async () => {
    await fixture.whenUserTryToValidateEmail("johndoe@gmail");

    fixture.thenErrorShouldBe(EntityValidationError);
  });
});
