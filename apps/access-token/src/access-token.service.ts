import jwt from "jsonwebtoken";

export class InvalidTokenError extends Error {
  constructor() {
    super("Invalid token");
  }
}

export class AccessTokenService {
  constructor(private readonly secret: string) {}

  create(payload: any): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1h",
    });
  }

  verify(token: string): any {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
}
