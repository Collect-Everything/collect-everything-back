import { describe, test, beforeEach } from "vitest";
import { Admin } from "../../domain/admin.entity";
import {
  AdminFixture,
  createAdminFixture,
} from "../_fixtures/admin.fixture";
import { EntityValidationError } from "@ce/shared-core";
import { EmailAlreadyTakenError } from "./register.errors";

describe("Create company user", () => {
  let fixture: AdminFixture;

  beforeEach(() => {
    fixture = createAdminFixture();
  });

  test("informations are correct, it should create admin", async () => {
    fixture.givenPredefinedId("id-1");

    await fixture.whenRegisteringAdmin({
      email: "johndoe@gmail.com",
      password: "Qwert123",
      firstname: "John",
      lastname: "Doe",
    });

    await fixture.thenAdminShouldBe(
      Admin.fromData({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "hashed-Qwert123",
        firstname: "John",
        lastname: "Doe",
      }),
    );
  });

  test("email is invalid, it should throw an error", async () => {
    fixture.givenPredefinedId("id-1");

    await fixture.whenRegisteringAdmin({
      email: "johndoe.com",
      password: "Qwert123",
      firstname: "John",
      lastname: "Doe",
    });

    fixture.thenErrorShouldBe(EntityValidationError);
  });

  test("user with the same email already exists, it should throw an error", async () => {
    fixture.givenPredefinedId("id-1");

    fixture.givenSomeAdmins([
      Admin.fromData({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "hashed-Qwert123",
        firstname: "John",
        lastname: "Doe",
      }),
    ]);

    await fixture.whenRegisteringAdmin({
      email: "johndoe@gmail.com",
      password: "Qwert123",
      firstname: "John",
      lastname: "Doe",
    });

    fixture.thenErrorShouldBe(EmailAlreadyTakenError);
  });
});
