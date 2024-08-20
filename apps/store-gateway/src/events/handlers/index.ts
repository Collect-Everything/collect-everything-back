import { Handler } from '@ce/events';
import { registerEmailValidationEvents } from './email-validation.events-handler';
import { registerCompanyCustomersEvents } from './company-customers.events-handler';

export const ALL_EVENTS_HANDLERS: Handler[] = [
  registerEmailValidationEvents,
  registerCompanyCustomersEvents
];
