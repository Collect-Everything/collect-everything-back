import { describe, test, beforeEach, expect } from "vitest";
import { AccessTokenService } from "./access-token.service";

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
    });
  });
});
