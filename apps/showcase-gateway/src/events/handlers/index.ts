import { Handler } from "@ce/events";
import { registerCompanyUsersEvents } from "./company-users.events-handler";
import { registerEmailValidationEvents } from "./email-validation.events-handler";

export const ALL_EVENTS_HANDLERS: Handler[] = [
  registerCompanyUsersEvents,
  registerEmailValidationEvents,
];
