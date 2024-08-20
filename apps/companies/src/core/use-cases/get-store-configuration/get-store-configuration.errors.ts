export class StoreNotConfiguredError extends Error {
  constructor() {
    super(`Store not configured`);
  }
}
