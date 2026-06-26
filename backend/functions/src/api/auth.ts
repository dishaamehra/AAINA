import { onRequest } from 'firebase-functions/v2/https';
import { ZodError } from 'zod';
import { applyCorsHeaders, isPreflightRequest } from '../middleware/cors.js';
import { verifyFirebaseIdToken } from '../middleware/auth.middleware.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AuthService } from '../services/auth.service.js';
import { syncAuthenticatedUserRequestSchema } from '../validators/auth.validators.js';
import { sendError, sendSuccess } from '../utils/http.js';
import { createRequestId } from '../utils/request.js';
import { logError, logInfo, logWarning } from '../utils/logger.js';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const functionName = 'syncAuthenticatedUser';

export const syncAuthenticatedUser = onRequest(
  { region: 'us-central1' },
  async (request, response) => {
    const requestId = createRequestId();
    const logContext = { requestId, functionName };

    applyCorsHeaders(request.headers, response);

    if (isPreflightRequest(request.method)) {
      response.status(204).end();
      return;
    }

    if (request.method !== 'POST') {
      sendError(response, requestId, 405, 'METHOD_NOT_ALLOWED', 'Only POST requests are allowed.');
      return;
    }

    try {
      const authContext = await verifyFirebaseIdToken(request.headers.authorization);
      const parsedBody = syncAuthenticatedUserRequestSchema.parse(request.body ?? {});
      const user = await authService.syncAuthenticatedUser({
        authenticatedUser: authContext.user,
        timezone: parsedBody.timezone,
      });

      logInfo(
        { ...logContext, userId: authContext.user.uid },
        'Authenticated user profile synchronized.',
      );
      sendSuccess(response, requestId, { user });
    } catch (error) {
      if (error instanceof ZodError) {
        logWarning(logContext, 'Invalid syncAuthenticatedUser payload.', {
          issues: error.issues.map((issue) => issue.message),
        });
        sendError(response, requestId, 400, 'VALIDATION_ERROR', 'Invalid authentication payload.');
        return;
      }

      if (error instanceof Error && error.message.includes('token')) {
        logWarning(logContext, 'Unauthorized authentication request.');
        sendError(response, requestId, 401, 'UNAUTHORIZED', 'Authentication is required.');
        return;
      }

      logError(logContext, 'Failed to synchronize authenticated user.', error);
      sendError(response, requestId, 500, 'INTERNAL_ERROR', 'Unable to initialize user profile.');
    }
  },
);
