export enum AuthErrorType {
  INVALID_LOGIN = 'INVALID_LOGIN',
  NETWORK_ERROR = 'NETWORK_ERROR',
  EXPIRED_SESSION = 'EXPIRED_SESSION',
  UNAUTHORIZED = 'UNAUTHORIZED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_UNVERIFIED = 'EMAIL_UNVERIFIED'
}

export interface AuthError {
  type: AuthErrorType;
  message: string;
  code?: number;
}
