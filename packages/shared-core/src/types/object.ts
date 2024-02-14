export type TObjectWithId = Object & { id: string };

export type ModelToBase<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
