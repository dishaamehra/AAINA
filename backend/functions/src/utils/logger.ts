import * as logger from 'firebase-functions/logger';

export interface LogContext {
  requestId: string;
  userId?: string;
  functionName: string;
}

export const logInfo = (
  context: LogContext,
  message: string,
  data?: Record<string, unknown>,
): void => {
  logger.info(message, { ...context, ...data });
};

export const logWarning = (
  context: LogContext,
  message: string,
  data?: Record<string, unknown>,
): void => {
  logger.warn(message, { ...context, ...data });
};

export const logError = (context: LogContext, message: string, error: unknown): void => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  logger.error(message, { ...context, errorMessage });
};
