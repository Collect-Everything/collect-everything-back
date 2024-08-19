import {
  BaseController,
  BaseResponse,
  HttpException,
  ctrlWrapper,
} from "@ce/server-core";
import { RequestHandler } from "express";
import { EmailAlreadyTakenError } from "./core/use-cases/register/register.errors";
import { ValidateCredentialsUseCase } from "./core/use-cases/validate-credentials/validate-credentials.usecase";
import { RegisterUseCase } from "./core/use-cases/register/register.usecase";
import { RegisterCommand } from "./core/use-cases/register/register.command";
import { AdminNotFoundError } from "./core/errors/admin-not-found";

export class AdminController extends BaseController {
  constructor(
    private readonly validateCredentialsUseCase: ValidateCredentialsUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {
    super("Admin");
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
