import { HttpException } from './http-exception';

export class ServiceCallError extends Error {
  constructor(
    public status: number,
    public message: string,
    public key?: string
  ) {
    super(message);
  }
}

export const serviceCallErrorToHttpException = (error: ServiceCallError) => {
  return new HttpException(error.status, error.message, undefined, error.key);
};
