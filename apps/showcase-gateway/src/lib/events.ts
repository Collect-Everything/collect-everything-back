import { EventsService } from "@ce/events";
import { EventsHandler } from "../events/events-handler";

export const eventsService = new EventsService();

export const eventsHandler = new EventsHandler(eventsService);
