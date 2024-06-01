export class LastAdminError extends Error {
  constructor() {
    super("Cannot delete last admin");
  }
}
