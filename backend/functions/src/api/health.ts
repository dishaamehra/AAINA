import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import type { ApiResponse } from '@aaina/shared';

export const healthCheck = onRequest(
  { cors: true, region: 'us-central1' },
  (_request, response) => {
    const payload: ApiResponse<{ status: string; service: string }> = {
      success: true,
      data: {
        status: 'ok',
        service: 'aaina-api',
      },
      metadata: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      },
    };

    logger.info('Health check requested');
    response.status(200).json(payload);
  },
);
