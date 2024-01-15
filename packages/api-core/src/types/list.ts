import { IFilter } from "./filters";
import { ISort } from "./sort";

export interface IListQuery {
  filters?: IFilter[];
  offset?: number;
  limit?: number;
  sort?: ISort;
}
