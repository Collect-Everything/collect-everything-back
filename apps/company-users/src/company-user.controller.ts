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

export class CompanyUserController extends BaseController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly validateEmailUseCase: ValidateEmailUseCase,
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
      const { email } = req.params;

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
}
