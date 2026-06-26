import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import type { UserProfile } from '@aaina/shared';
import { getFirebaseAuth } from '../config/firebase.js';

import { authService } from '../services/auth.service.js';
import type { AuthContextValue } from '../types/auth.js';
import { AuthContext } from './auth-context.js';
const firebaseAuth = getFirebaseAuth();

interface AuthProviderProps {
  children: ReactNode;
}

const resolveAuthErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Authentication failed. Please try again.';
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const syncProfile = useCallback(async (user: User): Promise<void> => {
    const response = await authService.syncAuthenticatedUser(user);
    setProfile(response.user);
  }, []);

  const refreshProfile = useCallback(async (): Promise<void> => {
    const currentUser = firebaseAuth.currentUser;

    if (!currentUser) {
      setProfile(null);
      return;
    }

    await syncProfile(currentUser);
  }, [syncProfile]);

  useEffect(() => {
    let isMounted = true;

    const initializeRedirectResult = async (): Promise<void> => {
      try {
        await authService.completeRedirectSignIn();
      } catch (redirectError) {
        if (isMounted) {
          setError(resolveAuthErrorMessage(redirectError));
        }
      }
    };

    void initializeRedirectResult();

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      const loadUser = async (): Promise<void> => {
        if (!isMounted) {
          return;
        }

        setIsLoading(true);
        setFirebaseUser(user);

        if (!user) {
          setProfile(null);
          setIsLoading(false);
          return;
        }

        try {
          await syncProfile(user);
          setError(null);
        } catch (syncError) {
          setProfile(null);
          setError(resolveAuthErrorMessage(syncError));
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };

      void loadUser();
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [syncProfile]);

  const signInWithGoogle = useCallback(async (): Promise<void> => {
    setError(null);
    await authService.signInWithGoogle();
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setError(null);
    await authService.logout();
    setFirebaseUser(null);
    setProfile(null);
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      profile,
      isAuthenticated: Boolean(firebaseUser && profile),
      isLoading,
      error,
      signInWithGoogle,
      logout,
      refreshProfile,
      clearError,
    }),
    [firebaseUser, profile, isLoading, error, signInWithGoogle, logout, refreshProfile, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
