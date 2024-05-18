import { EventsService } from "@ce/events";

export type Handler = (service: EventsService) => void;

export const ALL_EVENTS_HANDLERS: Handler[] = [];
