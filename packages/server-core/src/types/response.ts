export interface ServiceError {
  message: string;
  key: string;
  details?: any;
}
export interface BaseResponse<T = any> {
  success: boolean;
  data: T;
  status?: number;
  errors?: ServiceError[];
}
