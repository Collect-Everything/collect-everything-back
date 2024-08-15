import { Handler, ServerEvent } from "@ce/events";
import { emailValidationService } from "../../dependency-injection";

export const COMPANY_USER_CREATED = "company-user/created";

export type CompanyUserCreatedPayload = {
  email: string;
};

export const SEND_VALIDATION_EMAIL_FAILED =
  "company-user/send-validation-email-failed";

export type SendValidationEmailFailedPayload = {
  email: string;
};

export const registerCompanyUsersEvents: Handler = (service) => {
  service.on(
    COMPANY_USER_CREATED,
    async (payload: CompanyUserCreatedPayload) => {
      const result = await emailValidationService.sendValidationEmail(
        payload.email,
      );

      if (result.isErr()) {
        console.error("Failed to send validation email : " + result.error);

        service.send(
          ServerEvent.create({
            type: SEND_VALIDATION_EMAIL_FAILED,
            payload: { email: payload.email },
          }),
        );
      }

      console.info(`Validation email sent to ${payload.email}`);
    },
  );
};
