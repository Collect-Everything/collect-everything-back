import { BaseController } from "@ce/server-core";
import { CheckValidationTokenUseCase } from "./core/use-cases/check-validation-token/check-validation-token";
import { SendValidationEmailUseCase } from "./core/use-cases/send-validation-email/send-validation-email";

export class EmailValidationController extends BaseController {
  constructor(
    private readonly sendValidationEmailUseCase: SendValidationEmailUseCase,
    private readonly checkValidationTokenUseCase: CheckValidationTokenUseCase,
  ) {
    super("email-validation");
  }
}
