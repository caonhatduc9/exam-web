
type errorType = Record<
  string,
  {
    msg: string;
    [key: string]: any;
  }
>;

export class ErrorWithStatus {
  message: string;
  status: number;
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message;
    this.status = status;
  }
}

export class EntityError extends ErrorWithStatus {
  errors: errorType;
  constructor({ message = 'validation error', errors }: { message?: string; errors: errorType }) {
    super({ message, status: 422 });
    this.errors = errors;
  }
}
