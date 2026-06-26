import type { AuthenticatedUser } from '@aaina/shared';
import { UserRole } from '@aaina/shared';
import { adminAuth } from '../config/firebase.js';

export interface VerifiedAuthContext {
  user: AuthenticatedUser;
  tokenIssuedAt: number;
}

const extractBearerToken = (authorizationHeader: string | string[] | undefined): string => {
  if (Array.isArray(authorizationHeader)) {
    throw new Error('Invalid authorization header.');
  }

  if (!authorizationHeader?.startsWith('Bearer ')) {
    throw new Error('Missing Firebase ID token.');
  }

  return authorizationHeader.slice('Bearer '.length).trim();
};

export const verifyFirebaseIdToken = async (
  authorizationHeader: string | string[] | undefined,
): Promise<VerifiedAuthContext> => {
  const idToken = extractBearerToken(authorizationHeader);
  const decodedToken = await adminAuth.verifyIdToken(idToken, true);

  if (!decodedToken.uid || !decodedToken.email) {
    throw new Error('Firebase token is missing required identity fields.');
  }

  return {
    user: {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name ?? decodedToken.email.split('@')[0],
      photoURL: decodedToken.picture ?? null,
      role: UserRole.Student,
    },
    tokenIssuedAt: decodedToken.iat,
  };
};
