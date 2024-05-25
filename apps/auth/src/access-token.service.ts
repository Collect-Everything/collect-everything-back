import { Err, Ok, Result } from "@ce/shared-core";
import jwt from "jsonwebtoken";

export class InvalidTokenError extends Error {
  constructor() {
    super("Invalid token");
  }
}

export class AccessTokenService {
  constructor(private readonly secret: string) {}

  create(
    payload: any,
  ): Result<{ accessToken: string; refreshToken: string }, never> {
    return Ok.of({
      accessToken: this.createAccessToken(payload),
      refreshToken: this.createRefreshToken(payload),
    });
  }

  verify(token: string): Result<any, InvalidTokenError> {
    try {
      const payload = jwt.verify(token, this.secret);
      return Ok.of(payload);
    } catch (error) {
      return Err.of(new InvalidTokenError());
    }
  }

  private createAccessToken(payload: any): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1h",
    });
  }

  private createRefreshToken(payload: any): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1w",
    });
  }
}
