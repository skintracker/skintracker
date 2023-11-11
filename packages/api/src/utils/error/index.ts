export enum STGenericErrorType {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  TursoError = 600,
}

export interface STGenericError {
  error: STGenericErrorType;
  message: string;
}
