import { Handler } from "@ce/events";
import { logger } from "@ce/logger";

export const EMAIL_VERIFIED_EVENT = "email/verified";

export type EmailVerifiedPayload = {
  email: string;
};

export const registerEmailValidationEvents: Handler = (service) => {
  service.on(EMAIL_VERIFIED_EVENT, async (payload: EmailVerifiedPayload) => {
    console.log(`Email ${payload.email} has been verified`);
  });
};
