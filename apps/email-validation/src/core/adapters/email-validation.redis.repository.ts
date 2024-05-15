import { RedisClientType } from "redis";
import {
  EmailValidation,
  EmailValidationData,
} from "../domain/email-validation.entity";
import { EmailValidationRepository } from "../ports/email-validation.repository";

export class RedisEmailValidationRepository
  implements EmailValidationRepository
{
  constructor(private readonly redisClient: RedisClientType) {}

  async save(emailValidation: EmailValidation): Promise<void> {
    await this.redisClient.set(
      this.getStorageKey(emailValidation),
      JSON.stringify(emailValidation.data),
    );
  }

  async findByEmail(email: string): Promise<EmailValidation | null> {
    const keys = await this.redisClient.keys(`${email}-*`);
    if (keys.length === 0) {
      return null;
    }
    const data = await this.redisClient.get(keys[0]);

    if (!data) {
      return null;
    }

    return EmailValidation.create(this.parseStorageData(data));
  }

  async findByToken(token: string): Promise<EmailValidation | null> {
    const keys = await this.redisClient.keys(`*-${token}`);
    if (keys.length === 0) {
      return null;
    }
    const data = await this.redisClient.get(keys[0]);
    if (!data) {
      return null;
    }
    return EmailValidation.create(this.parseStorageData(data));
  }

  private getStorageKey(emailValidation: EmailValidation): string {
    return emailValidation.email + "-" + emailValidation.token;
  }

  private parseStorageKey(storageKey: string) {
    const [email, token] = storageKey.split("-");

    return { email, token };
  }

  private parseStorageData(data: string) {
    const parsedData = JSON.parse(data);

    parsedData.createdAt = new Date(parsedData.createdAt);

    return parsedData as EmailValidationData;
  }
}
