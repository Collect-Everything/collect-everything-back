import { EventsService } from "@ce/events";
import { ALL_EVENTS_HANDLERS } from "./handlers";

export const eventsService = new EventsService(ALL_EVENTS_HANDLERS);
