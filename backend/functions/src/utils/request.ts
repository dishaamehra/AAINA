import { randomUUID } from 'node:crypto';

export const createRequestId = (): string => randomUUID();

export const nowIso = (): string => new Date().toISOString();
