import { ThemePreference, UserRole } from './enums.js';

export interface WorkingHours {
  start: string;
  end: string;
}

export interface UserPreferences {
  theme: ThemePreference;
  language: string;
  prefersReducedMotion: boolean;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  weeklyReview: boolean;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  photoURL: string | null;
  role: UserRole;
  timezone: string;
  workingHours: WorkingHours | null;
  studyHours: WorkingHours | null;
  sleepHours: WorkingHours | null;
  recurringActivities: string[];
  preferences: UserPreferences;
  notificationSettings: NotificationSettings;
  createdAt: string;
  updatedAt: string;
}

export interface AuthenticatedUser {
  uid: string;
  email: string;
  name: string;
  photoURL: string | null;
  role: UserRole;
}

export interface SyncAuthenticatedUserRequest {
  timezone?: string;
}

export interface SyncAuthenticatedUserResponse {
  user: UserProfile;
}
