import {
  BaseController,
  BaseResponse,
  HttpException,
  ctrlWrapper,
} from "@ce/server-core";
import { RequestHandler } from "express";
import { AdminService } from "./core/application/admin.service";
import { ValidateCredentialsUseCase } from "./core/uses-cases/validate-credentials/validate-credentials.usecase";

export class AdminController extends BaseController {
  constructor(private readonly adminService: AdminService, private readonly validateCredentialsUseCase: ValidateCredentialsUseCase,) {
    super("Admin");
  }

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
