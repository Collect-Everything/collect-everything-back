import { TListQuery } from "./api";
import { RequestHandler } from "express";

export interface ICrudService<
  CreationAttributes extends Object,
  Model extends Object,
  OrmModel extends unknown,
> {
  get: (itemId: number) => Promise<OrmModel | null>;
  list: (query: TListQuery) => Promise<OrmModel[]>;
  create: (item: CreationAttributes) => Promise<OrmModel>;
  update: (itemId: number, item: Partial<Model>) => Promise<OrmModel | null>;
  delete: (itemId: number) => Promise<OrmModel | undefined>;
  count: (query: TListQuery) => Promise<number>;
}

export interface ICrudController {
  list: RequestHandler;
  get: RequestHandler;
  create: RequestHandler;
  patch: RequestHandler;
  delete: RequestHandler;
}

export interface IBaseRepository {
  get: (itemId: number) => Promise<any>;
  list: (query: TListQuery) => Promise<any[]>;
  create: (item: any) => Promise<any>;
  update: (itemId: number, item: any) => Promise<any>;
  delete: (itemId: number) => Promise<any>;
  count: (query: TListQuery) => Promise<number>;
}
