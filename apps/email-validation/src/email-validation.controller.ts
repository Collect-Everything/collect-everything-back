import { BaseController, BaseResponse, ctrlWrapper } from "@ce/server-core";
import { CheckValidationTokenUseCase } from "./core/use-cases/check-validation-token/check-validation-token";
import { SendValidationEmailUseCase } from "./core/use-cases/send-validation-email/send-validation-email";
import { RequestHandler } from "express";
import { ApiResponse } from "@ce/shared-core";
import { HttpException } from "@ce/server-core";
import { EmailValidationNotFoundError } from "./core/use-cases/check-validation-token/check-validation-token.errors";

export class EmailValidationController extends BaseController {
  constructor(
    private readonly sendValidationEmailUseCase: SendValidationEmailUseCase,
    private readonly checkValidationTokenUseCase: CheckValidationTokenUseCase,
  ) {
    super("EmailValidationController");
  }

  sendValidationEmail: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("sendValidationEmail"), res, async () => {
      const body = req.body;

      if (!body || !req.body.email) {
        throw new HttpException(400, "Missing required email in body");
      }

      await this.sendValidationEmailUseCase.execute(body);

      return {
        success: true,
        data: {},
      } satisfies ApiResponse;
    });

  checkValidationToken: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("checkValidationToken"), res, async () => {
      const { token } = req.params;

      if (!token) {
        throw new HttpException(400, "Missing token param");
      }

      const result = await this.checkValidationTokenUseCase.execute({ token });

      if (result.isErr()) {
        if (result.error instanceof EmailValidationNotFoundError) {
          return {
            success: true,
            data: {
              isValid: false,
            },
          } satisfies BaseResponse;
        }
        throw new HttpException(400, result.error.message);
      }

      return {
        success: true,
        data: {
          email: result.value.email,
          isValid: true,
        },
      } satisfies BaseResponse;
    });
}
