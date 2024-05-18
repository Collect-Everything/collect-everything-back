import { EventsService } from "@ce/events";
import { ALL_EVENTS_HANDLERS } from "./handlers";

export class EventsHandler {
  constructor(private eventsService: EventsService) {
    this.init();
  }

  init() {
    ALL_EVENTS_HANDLERS.forEach((handler) => handler(this.eventsService));
  }
}
