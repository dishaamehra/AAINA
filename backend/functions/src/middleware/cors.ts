import type { IncomingHttpHeaders } from 'node:http';
import type { HttpResponseLike } from '../utils/http.js';

const parseAllowedOrigins = (): Set<string> => {
  const configuredOrigins = process.env.ALLOWED_ORIGINS ?? '';
  const origins = configuredOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (process.env.FUNCTIONS_EMULATOR === 'true') {
    origins.push('http://localhost:5173', 'http://127.0.0.1:5173');
  }

  return new Set(origins);
};

export const applyCorsHeaders = (
  headers: IncomingHttpHeaders,
  response: HttpResponseLike,
): void => {
  const origin = typeof headers.origin === 'string' ? headers.origin : undefined;
  const allowedOrigins = parseAllowedOrigins();

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  response.setHeader('Access-Control-Max-Age', '3600');
};

export const isPreflightRequest = (method: string): boolean => method.toUpperCase() === 'OPTIONS';
