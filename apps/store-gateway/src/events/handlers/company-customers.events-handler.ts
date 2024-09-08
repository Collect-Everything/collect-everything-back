import { Handler, ServerEvent } from '@ce/events';
import { emailValidationService } from '../../dependency-injection';

export const COMPANY_CUSTOMER_CREATED = 'company-customer/created';

export type CompanyCustomerCreatedPayload = {
  email: string;
};

export const SEND_VALIDATION_EMAIL_FAILED =
  'company-customer/send-validation-email-failed';

export type SendValidationEmailFailedPayload = {
  email: string;
};

export const registerCompanyCustomersEvents: Handler = (service) => {
  service.on(
    COMPANY_CUSTOMER_CREATED,
    async (payload: CompanyCustomerCreatedPayload) => {
      const result = await emailValidationService.sendValidationEmail(
        payload.email,
        'http://localhost:3001/validate-email'
      );

      if (result.isErr()) {
        console.error('Failed to send validation email : ' + result.error);

        service.send(
          ServerEvent.create({
            type: SEND_VALIDATION_EMAIL_FAILED,
            payload: { email: payload.email }
          })
        );
      }

      console.info(`Validation email sent to ${payload.email}`);
    }
  );
};
