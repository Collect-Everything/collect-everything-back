import { describe, test, expect } from "vitest";
import { AccessTokenService, InvalidTokenError } from "./access-token.service";

describe("AccessTokenService", () => {
  test("create() - given any payload, it should return access and refresh tokens", () => {
    const service = new AccessTokenService("secret");

    const res = service.create({ userId: 1, email: "johndoe@gmail.com" });

    if (res.isErr()) {
      throw res.error;
    }

    expect(res.value.accessToken).toBeDefined();
    expect(res.value.refreshToken).toBeDefined();
  });

  test("verify() - given a valid token, it should return the payload", () => {
    const service = new AccessTokenService("secret");

    const payload = { userId: 1, email: "johndoe@gmail.com" };

    const result = service.create(payload);

    if (result.isErr()) {
      throw result.error;
    }

    const verifyResult = service.verify(result.value.refreshToken);

    if (verifyResult.isErr()) {
      throw verifyResult.error;
    }

    expect(verifyResult.value).toEqual({
      ...payload,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  test("verify() - given an invalid token, it should throw an error", () => {
    let thrownError: any;

    const service = new AccessTokenService("secret");

    const payload = { userId: 1, email: "johndoe@gmail.com" };

    const createResult = service.create(payload);

    if (createResult.isErr()) {
      throw createResult.error;
    }

    const verifyResult = service.verify(createResult.value + "invalid");

    if (verifyResult.isErr()) {
      thrownError = verifyResult.error;
    }

    expect(thrownError).toBeInstanceOf(InvalidTokenError);
  });
});
