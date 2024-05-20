import { RedisClientType } from "redis";
import { RedisEmailValidationRepository } from "./core/adapters/email-validation.redis.repository";
import { RealDateProvider } from "./core/adapters/real-date-provider";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { RealTokenProvider } from "./core/adapters/real-token-provider";
import { StubEmailValidator } from "./core/adapters/stub-email-validator";
import { redisClient } from "./lib/redis";
import { SendValidationEmailUseCase } from "./core/use-cases/send-validation-email/send-validation-email";
import { CheckValidationTokenUseCase } from "./core/use-cases/check-validation-token/check-validation-token";
import { EmailValidationController } from "./email-validation.controller";
import { EmailValidationRouter } from "./email-validation.router";

const dateProvider = new RealDateProvider();
const idProvider = new RealIDProvider();
const tokenProvider = new RealTokenProvider();
const emailValidator = new StubEmailValidator((emailValidation) =>
  console.log(
    `Sending email to ${emailValidation.email}, the code is : ${emailValidation.token}`,
  ),
);

const repository = new RedisEmailValidationRepository(
  redisClient as RedisClientType,
);

const sendValidationEmailUseCase = new SendValidationEmailUseCase(
  repository,
  emailValidator,
  dateProvider,
  tokenProvider,
  idProvider,
);

const checkValidationTokenUseCase = new CheckValidationTokenUseCase(
  repository,
  dateProvider,
);

const controller = new EmailValidationController(
  sendValidationEmailUseCase,
  checkValidationTokenUseCase,
);

const emailValidationRouter = new EmailValidationRouter(controller).router;

export { emailValidationRouter };
