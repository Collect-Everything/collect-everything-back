export type TObjectWithId = Object & { id: number };

export type ModelToBase<T> = Omit<T, "id" | "created_at" | "updated_at">;
