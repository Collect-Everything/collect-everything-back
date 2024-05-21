import { describe, test, expect } from "vitest";
import { AccessTokenService, InvalidTokenError } from "./access-token.service";

describe("AccessTokenService", () => {
  test("create() - given any payload, it should return a token", () => {
    const service = new AccessTokenService("secret");

    const token = service.create({ userId: 1, email: "johndoe@gmail.com" });

    expect(token).not.toBeUndefined();
  });

  test("verify() - given a valid token, it should return the payload", () => {
    const service = new AccessTokenService("secret");

    const payload = { userId: 1, email: "johndoe@gmail.com" };

    const token = service.create(payload);

    const verifiedPayload = service.verify(token);

    expect(verifiedPayload).toEqual({
      ...payload,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  test("verify() - given an invalid token, it should throw an error", () => {
    let thrownError: any;

    try {
      const service = new AccessTokenService("secret");

      const payload = { userId: 1, email: "johndoe@gmail.com" };

      const token = service.create(payload);

      service.verify(token + "invalid");
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeInstanceOf(InvalidTokenError);
  });
});
