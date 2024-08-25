export class StoreNameAlreadyExistsError extends Error {
  constructor(storeName: string) {
    super(`Store name ${storeName} already exists`);
  }
}

export class NoStoreToConfigureError extends Error {
  constructor() {
    super(`No store to configure`);
  }
}
