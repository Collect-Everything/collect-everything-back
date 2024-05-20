import {
  BaseController,
  BaseResponse,
  HttpException,
  ctrlWrapper,
} from "@ce/server-core";
import { RegisterUseCase } from "./core/use-cases/register/register.usecase";
import { RequestHandler } from "express";
import { RegisterCommand } from "./core/use-cases/register/register.command";
import { EmailAlreadyTakenError } from "./core/use-cases/register/register.errors";
import { ValidateEmailUseCase } from "./core/use-cases/validate-email/validate-email.usecase";
import {
  CompanyUserNotFoundError,
  EmailAlreadyVerifiedError,
} from "./core/use-cases/validate-email/validate-email.errors";
import { ValidateCredentialsUseCase } from "./core/use-cases/validate-credentials/validate-credentials.usecase";

export class CompanyUserController extends BaseController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly validateEmailUseCase: ValidateEmailUseCase,
    private readonly validateCredentialsUseCase: ValidateCredentialsUseCase,
  ) {
    super("CompanyUser");
  }

  register: RequestHandler = async (req, res) =>
    ctrlWrapper("register", res, async () => {
      const body = req.body as RegisterCommand;

      const result = await this.registerUseCase.execute(body);

      if (result.isErr()) {
        if (result.error instanceof EmailAlreadyTakenError) {
          throw new HttpException(400, "Email already taken");
        }

        throw new HttpException(500, "Internal server error", result.error);
      }

      return {
        status: 201,
        success: true,
        data: {},
      } satisfies BaseResponse;
    });

  validateEmail: RequestHandler = async (req, res) =>
    ctrlWrapper("validateEmail", res, async () => {
      const email = req.body.email;

      if (!email) {
        throw new HttpException(400, "Email is required");
      }

      const result = await this.validateEmailUseCase.execute({ email });

      if (result.isErr()) {
        if (result.error instanceof CompanyUserNotFoundError) {
          throw new HttpException(404, "Company user not found");
        }

        if (result.error instanceof EmailAlreadyVerifiedError) {
          throw new HttpException(400, "Email already verified");
        }

        throw new HttpException(500, "Internal server error", [result.error]);
      }

      return {
        status: 200,
        success: true,
        data: {},
      } satisfies BaseResponse;
    });

  validateCredentials: RequestHandler = async (req, res) =>
    ctrlWrapper("validateCredentials", res, async () => {
      const email = req.body.email;
      const password = req.body.password;
      if (!email || !password) {
        throw new HttpException(400, "Email and password are required");
      }
      const result = await this.validateCredentialsUseCase.execute({
        email,
        password,
      });
      if (result.isErr()) {
        throw new HttpException(401, "Invalid credentials");
      }
      return {
        status: 200,
        success: true,
        data: result.value,
      } satisfies BaseResponse;
    });
}
