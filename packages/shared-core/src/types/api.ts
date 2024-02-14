export interface ApiError {
  message: string;
  key: string;
  details?: any;
}
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  errors?: ApiError[];
}
