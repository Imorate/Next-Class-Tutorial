export interface ApiErrorResponse {
  message?: string;
  errors?: string[];
  fieldErrors?: Record<string, string[]>;
}

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export class ApiError extends Error {
  readonly status: number;
  readonly errors?: string[];
  readonly fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    options?: {
      errors?: string[];
      fieldErrors?: Record<string, string[]>;
    },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = options?.errors;
    this.fieldErrors = options?.fieldErrors;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
