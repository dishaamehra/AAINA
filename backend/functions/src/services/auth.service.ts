import { ThemePreference, UserRole, type AuthenticatedUser, type UserProfile } from '@aaina/shared';
import { UserRepository } from '../repositories/user.repository.js';

export interface SyncUserProfileInput {
  authenticatedUser: AuthenticatedUser;
  timezone?: string;
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async syncAuthenticatedUser(input: SyncUserProfileInput): Promise<UserProfile> {
    const existingUser = await this.userRepository.findById(input.authenticatedUser.uid);

    if (!existingUser) {
      await this.userRepository.create(this.createInitialUserProfile(input));
      const createdUser = await this.userRepository.findById(input.authenticatedUser.uid);

      if (!createdUser) {
        throw new Error('User profile initialization failed.');
      }

      return createdUser;
    }

    await this.userRepository.updateProfile(existingUser.userId, {
      name: input.authenticatedUser.name,
      email: input.authenticatedUser.email,
      photoURL: input.authenticatedUser.photoURL,
      timezone: input.timezone ?? existingUser.timezone,
    });

    const updatedUser = await this.userRepository.findById(existingUser.userId);

    if (!updatedUser) {
      throw new Error('User profile synchronization failed.');
    }

    return updatedUser;
  }

  private createInitialUserProfile(
    input: SyncUserProfileInput,
  ): Omit<UserProfile, 'createdAt' | 'updatedAt'> {
    return {
      userId: input.authenticatedUser.uid,
      name: input.authenticatedUser.name,
      email: input.authenticatedUser.email,
      photoURL: input.authenticatedUser.photoURL,
      role: UserRole.Student,
      timezone: input.timezone ?? 'UTC',
      workingHours: null,
      studyHours: null,
      sleepHours: null,
      recurringActivities: [],
      preferences: {
        theme: ThemePreference.System,
        language: 'en',
        prefersReducedMotion: false,
      },
      notificationSettings: {
        email: true,
        push: false,
        weeklyReview: true,
      },
    };
  }
}
