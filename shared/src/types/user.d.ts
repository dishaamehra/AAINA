import { UserRole } from './enums.js';
export interface WorkingHours {
    start: string;
    end: string;
}
export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    planningStyle: string;
    notificationsEnabled: boolean;
}
export interface UserProfile {
    userId: string;
    name: string;
    email: string;
    photoURL?: string;
    role: UserRole;
    timezone: string;
    workingHours: WorkingHours;
    studyHours?: WorkingHours;
    sleepHours?: WorkingHours;
    preferences: UserPreferences;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=user.d.ts.map