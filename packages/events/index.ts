import { logger } from "@ce/logger";

export class Event<T = undefined> {
  type: string;
  payload: T;
  constructor(type: string, payload: T) {
    this.type = type;
    this.payload = payload;
  }
}

export class EventsService {
  allListeners: ((payload: any) => void)[] = [];
  listeners: { [type: string]: ((payload: any) => void)[] } = {};

  init() {}

  send<T>(event: Event<T>) {
    logger.info(`[EVENTS SERVICE] - ${event.type}`);
    const listeners = [
      ...this.allListeners,
      ...(this.listeners[event.type] ?? []),
    ];
    if (listeners.length) {
      setTimeout(() => {
        for (let i = 0; i < listeners.length; i++) {
          try {
            listeners[i](event.payload);
          } catch (error) {
            logger.error("[EVENTS SERVICE]" + error);
          }
        }
      });
    }
  }

  on<T>(type: string, callback: (payload: T) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(callback);
    return () => this.unregister(callback, this.listeners[type]);
  }

  onAll(callback: (event: Event<any>) => void) {
    this.allListeners.push(callback);
    return () => this.unregister(callback, this.allListeners);
  }

  unregister(callback: (event: any) => void, list: ((event: any) => void)[]) {
    list.splice(list?.indexOf(callback), 1);
  }
}
