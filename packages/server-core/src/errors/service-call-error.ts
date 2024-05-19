export class ServiceCallError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
