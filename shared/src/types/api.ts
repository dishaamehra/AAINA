export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  metadata?: ApiMetadata;
  error?: ApiError;
}

export interface ApiMetadata {
  requestId?: string;
  timestamp?: string;
  engineVersion?: string;
}

export interface ApiError {
  code: string;
  message: string;
}
