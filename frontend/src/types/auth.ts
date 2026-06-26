import type { User } from 'firebase/auth';
import type { UserProfile } from '@aaina/shared';

export interface AuthContextValue {
  firebaseUser: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}
