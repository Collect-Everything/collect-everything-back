import { PasswordHasher } from "../ports/password-hasher";
import * as bcrypt from "bcrypt";

export class RealPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
