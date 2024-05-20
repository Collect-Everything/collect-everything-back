export class StoreNameAlreadyExistsError extends Error {
  constructor(storeName: string) {
    super(`Store name ${storeName} already exists`);
  }
}

export class CompanyNotFoundError extends Error {
  constructor(companyId: string) {
    super(`Company ${companyId} not found`);
  }
}
