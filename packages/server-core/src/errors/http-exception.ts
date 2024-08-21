export class HttpException extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: any[]
  ) {
    super(message);
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      errors: this.errors
    };
  }
}
