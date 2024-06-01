import { Handler } from "@ce/events";
import { registerEmailValidationEvents } from "./email-validation.events-handler";

export const ALL_EVENTS_HANDLERS: Handler[] = [registerEmailValidationEvents];
