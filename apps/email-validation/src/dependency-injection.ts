import { RedisClientType } from "redis";
import { RedisEmailValidationRepository } from "./core/adapters/email-validation.redis.repository";
import { RealDateProvider } from "./core/adapters/real-date-provider";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { RealTokenProvider } from "./core/adapters/real-token-provider";
import { redisClient } from "./lib/redis";
import { SendValidationEmailUseCase } from "./core/use-cases/send-validation-email/send-validation-email.usecase";
import { CheckValidationTokenUseCase } from "./core/use-cases/check-validation-token/check-validation-token";
import { EmailValidationController } from "./email-validation.controller";
import { EmailValidationRouter } from "./email-validation.router";
import { BrevoEmailValidator } from "./core/adapters/brevo-email-validator";
import { BrevoEmailService } from "./core/services/brevo-email-service";
import { brevoConfig } from "./config/brevo.config";

const dateProvider = new RealDateProvider();
const idProvider = new RealIDProvider();
const tokenProvider = new RealTokenProvider();
const brevoEmailService = new BrevoEmailService(brevoConfig)
const emailValidator = new BrevoEmailValidator(brevoEmailService)
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
