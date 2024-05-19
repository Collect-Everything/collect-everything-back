import { logger } from "@ce/logger";

export class ServerEvent<T = undefined> {
  type: string;
  payload: T;
  private constructor(type: string, payload: T) {
    this.type = type;
    this.payload = payload;
  }

  static create<T = undefined>({
    type,
    payload,
  }: {
    type: string;
    payload: T;
  }) {
    return new ServerEvent(type, payload);
  }
}

export class EventsService {
  constructor(private readonly handlers: Handler[]) {
    this.init();
  }
  allListeners: ((payload: any) => void)[] = [];
  listeners: { [type: string]: ((payload: any) => void)[] } = {};

  init() {
    this.handlers.forEach((handler) => handler(this));
  }

  send<T>(event: ServerEvent<T>) {
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
    console.log("on", type);
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(callback);
    return () => this.unregister(callback, this.listeners[type]);
  }

  onAll(callback: (event: ServerEvent<any>) => void) {
    this.allListeners.push(callback);
    return () => this.unregister(callback, this.allListeners);
  }

  unregister(callback: (event: any) => void, list: ((event: any) => void)[]) {
    list.splice(list?.indexOf(callback), 1);
  }
}

export type Handler = (service: EventsService) => void;
