import type { ApiErrorCode, ApiErrorResponse, ApiSuccessResponse } from '@aaina/shared';
import { nowIso } from './request.js';

export interface HttpResponseLike {
  status(code: number): HttpResponseLike;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
  end(): void;
}

export const sendSuccess = <TData>(
  response: HttpResponseLike,
  requestId: string,
  data: TData,
  statusCode = 200,
): void => {
  const body: ApiSuccessResponse<TData> = {
    success: true,
    data,
    metadata: {
      requestId,
      timestamp: nowIso(),
    },
  };

  response.status(statusCode).json(body);
};

export const sendError = (
  response: HttpResponseLike,
  requestId: string,
  statusCode: number,
  code: ApiErrorCode,
  message: string,
): void => {
  const body: ApiErrorResponse = {
    success: false,
    code,
    message,
    metadata: {
      requestId,
      timestamp: nowIso(),
    },
  };

  response.status(statusCode).json(body);
};
