export class AdminNotFoundError extends Error {
  constructor(adminUserId: string) {
    super(`AdminUser ${adminUserId} not found`);
  }
  }
  