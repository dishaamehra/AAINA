export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'INTERNAL_ERROR'
  | 'VALIDATION_ERROR';

export interface ApiMetadata {
  requestId: string;
  timestamp: string;
}

export interface ApiSuccessResponse<TData> {
  success: true;
  data: TData;
  metadata: ApiMetadata;
}

export interface ApiErrorResponse {
  success: false;
  code: ApiErrorCode;
  message: string;
  metadata: ApiMetadata;
}

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;
