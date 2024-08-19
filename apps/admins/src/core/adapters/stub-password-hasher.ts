import { PasswordHasher } from "../ports/password-hasher";

export class StubPasswordHasher implements PasswordHasher {
  prefix = "hashed-";
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return this.prefix + password === hashedPassword;
  }
  async hash(password: string): Promise<string> {
    return this.prefix + password;
  }
}
