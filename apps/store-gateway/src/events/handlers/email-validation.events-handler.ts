import { Handler } from '@ce/events';
import { companyCustomersService } from '../../dependency-injection';

export const EMAIL_VERIFIED_EVENT = 'email/verified';

export type EmailVerifiedPayload = {
  email: string;
};

export const registerEmailValidationEvents: Handler = (service) => {
  service.on(EMAIL_VERIFIED_EVENT, async (payload: EmailVerifiedPayload) => {
    const result = await companyCustomersService.validateEmail(payload.email);

    if (result.isErr()) {
      console.error(
        `Failed to validate email: ${payload.email} - ${result.error.message}`
      );
      return;
    }
  });
};
