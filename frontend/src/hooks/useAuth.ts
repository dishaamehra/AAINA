import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context.js';
import type { AuthContextValue } from '../types/auth.js';

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
};
