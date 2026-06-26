import type { SyncAuthenticatedUserRequest, SyncAuthenticatedUserResponse } from '@aaina/shared';
import type { User } from 'firebase/auth';
import {
  browserLocalPersistence,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

import { getFirebaseAuth } from '../config/firebase.js';
import { postToCloudFunction } from './apiClient.js';

const firebaseAuth = getFirebaseAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const getBrowserTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

const shouldUseRedirectFallback = (code: string): boolean =>
  [
    'auth/popup-blocked',
    'auth/cancelled-popup-request',
    'auth/operation-not-supported-in-this-environment',
  ].includes(code);

export const authService = {
  async signInWithGoogle(): Promise<void> {
    await setPersistence(firebaseAuth, browserLocalPersistence);

    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const code = String(error.code);

        if (shouldUseRedirectFallback(code)) {
          await signInWithRedirect(firebaseAuth, googleProvider);
          return;
        }
      }

      throw error;
    }
  },

  async completeRedirectSignIn(): Promise<void> {
    await getRedirectResult(firebaseAuth);
  },

  async logout(): Promise<void> {
    await signOut(firebaseAuth);
  },

  async syncAuthenticatedUser(firebaseUser: User): Promise<SyncAuthenticatedUserResponse> {
    const payload: SyncAuthenticatedUserRequest = {
      timezone: getBrowserTimezone(),
    };

    return postToCloudFunction<SyncAuthenticatedUserRequest, SyncAuthenticatedUserResponse>(
      'syncAuthenticatedUser',
      firebaseUser,
      payload,
    );
  },
};
