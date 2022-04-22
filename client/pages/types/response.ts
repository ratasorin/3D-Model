export interface SuccessResponse<T> {
  error: false;
  payload: T | null;
}

export interface ErrorResponse {
  error: true;
  payload: string;
}

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse;
