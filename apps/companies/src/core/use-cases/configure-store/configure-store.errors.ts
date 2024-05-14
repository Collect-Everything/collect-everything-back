export class StoreNameAlreadyExistsError extends Error {
  constructor(storeName: string) {
    super(`Store name ${storeName} already exists`);
  }
}
