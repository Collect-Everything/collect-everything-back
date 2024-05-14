import { TListQuery } from "../types";

export interface IBaseRepository {
  get: (itemId: number) => Promise<any>;
  list: (query: TListQuery) => Promise<any[]>;
  create: (item: any) => Promise<any>;
  update: (itemId: number, item: any) => Promise<any>;
  delete: (itemId: number) => Promise<any>;
  count: (query: TListQuery) => Promise<number>;
}
