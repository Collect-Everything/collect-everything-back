import { BaseResponse, GatewayController, ctrlWrapper } from '@ce/server-core';
import { EmailValidationService } from './email-validation.service';
import { RequestHandler } from 'express';

export class EmailValidationController extends GatewayController {
  constructor(private readonly emailValidationService: EmailValidationService) {
    super('emailValidation');
  }

  checkValidationToken: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('checkValidationToken'), res, async () => {
      const { token } = req.params;

      const result =
        await this.emailValidationService.checkValidationToken(token);

      if (result.isErr()) {
        throw result.error;
      }

      return {
        success: true,
        data: {
          isValid: result.value.data.isValid,
          email: result.value.data.email
        }
      } satisfies BaseResponse;
    });
}
