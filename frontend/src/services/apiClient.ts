import type { ApiResponse } from '@aaina/shared';
import type { User } from 'firebase/auth';
import { appConfig } from '../config/app.js';

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export const postToCloudFunction = async <TRequest extends object, TResponse>(
  functionName: string,
  firebaseUser: User,
  payload: TRequest,
): Promise<TResponse> => {
  const idToken = await firebaseUser.getIdToken();
  const response = await fetch(`${appConfig.apiBaseUrl}/${functionName}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const body = (await response.json()) as ApiResponse<TResponse>;

  if (!body.success) {
    throw new ApiClientError(body.message, response.status, body.code);
  }

  return body.data;
};
