export interface PaginatedQuery {
  page: number;
  limit: number;
}

export interface PaginatedParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
