import { Err, Ok, Result } from "@ce/shared-core";
import jwt from "jsonwebtoken";

export class InvalidTokenError extends Error {
  constructor() {
    super("Invalid token");
  }
}

export class AccessTokenService {
  constructor(private readonly secret: string) {}

  create(payload: any): Result<string, never> {
    return Ok.of(
      jwt.sign(payload, this.secret, {
        expiresIn: "1h",
      }),
    );
  }

  verify(token: string): Result<any, InvalidTokenError> {
    try {
      const payload = jwt.verify(token, this.secret);
      return Ok.of(payload);
    } catch (error) {
      return Err.of(new InvalidTokenError());
    }
  }
}
