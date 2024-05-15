import {
  describe,
  beforeAll,
  beforeEach,
  test,
  afterAll,
  expect,
} from "vitest";
import { RedisContainer, StartedRedisContainer } from "@testcontainers/redis";
import { RedisClientType, createClient } from "redis";
import { EmailValidation } from "../domain/email-validation.entity";
import { RedisEmailValidationRepository } from "./email-validation.redis.repository";

async function connectTo(
  container: StartedRedisContainer,
): Promise<RedisClientType> {
  const client = createClient({
    url: container.getConnectionUrl(),
  });
  await client.connect();
  expect(client.isOpen).toBeTruthy();
  return client as RedisClientType;
}

describe("Redis Email Validation Repository", () => {
  let container: StartedRedisContainer;
  let client: Awaited<ReturnType<typeof connectTo>>;
  beforeAll(async () => {
    container = await new RedisContainer().withStartupTimeout(30000).start();

    client = await connectTo(container);
  });

  afterAll(async () => {
    await client.disconnect();
    await container.stop();
  });

  beforeEach(async () => {
    await client.flushAll();
  });

  describe("save()", () => {
    test("should save email validation", async () => {
      const repository = new RedisEmailValidationRepository(client);
      const emailValidation = EmailValidation.create({
        id: "1",
        email: "johndoe@gmail.com",
        token: "123456",
        createdAt: new Date(),
      });

      await repository.save(emailValidation);

      const storedEmailValidation = await client.get(
        "johndoe@gmail.com-123456",
      );

      expect(storedEmailValidation).not.toBeNull();
    });

    test("should store email validation data", async () => {
      const repository = new RedisEmailValidationRepository(client);
      const emailValidation = EmailValidation.create({
        id: "1",
        email: "johndoe@gmail.com",
        token: "123456",
        createdAt: new Date(),
      });

      await repository.save(emailValidation);

      const storedEmailValidation = await client.get(
        "johndoe@gmail.com-123456",
      );

      expect(storedEmailValidation).toEqual(
        JSON.stringify(emailValidation.data),
      );
    });
  });

  describe("findByEmail()", () => {
    test("should return null if email validation is not found", async () => {
      const repository = new RedisEmailValidationRepository(client);

      expect(await repository.findByEmail("johndoe@gmail.com")).toBeNull();
    });

    test("should return email validation if it exists", async () => {
      const repository = new RedisEmailValidationRepository(client);
      const emailValidation = EmailValidation.create({
        id: "1",
        email: "johndoe@gmail.com",
        token: "123456",
        createdAt: new Date(),
      });

      await repository.save(emailValidation);

      const storedEmailValidation =
        await repository.findByEmail("johndoe@gmail.com");

      expect(storedEmailValidation).toEqual(emailValidation);
    });
  });

  describe("findByToken()", () => {
    test("should return null if email validation is not found", async () => {
      const repository = new RedisEmailValidationRepository(client);
      expect(await repository.findByToken("123456")).toBeNull();
    });

    test("should return email validation if it exists", async () => {
      const repository = new RedisEmailValidationRepository(client);
      const emailValidation = EmailValidation.create({
        id: "1",
        email: "johndoe@gmail.com",
        token: "123456",
        createdAt: new Date(),
      });

      await repository.save(emailValidation);

      const storedEmailValidation = await repository.findByToken("123456");

      expect(storedEmailValidation).toEqual(emailValidation);
    });
  });
});
