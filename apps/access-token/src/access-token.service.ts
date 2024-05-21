import jwt from "jsonwebtoken";
export class AccessTokenService {
  constructor(private readonly secret: string) {}

  create(payload: any): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1h",
    });
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
