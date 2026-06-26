import type { UserProfile } from '@aaina/shared';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { db } from '../config/firebase.js';

interface FirestoreUserProfile extends Omit<UserProfile, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

type PersistedFirestoreUserProfile = Omit<FirestoreUserProfile, 'createdAt' | 'updatedAt'> & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export class UserRepository {
  private readonly collection = db.collection('users');

  async findById(userId: string): Promise<UserProfile | null> {
    const snapshot = await this.collection.doc(userId).get();

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data() as PersistedFirestoreUserProfile;
    return this.toDomain(data);
  }

  async create(user: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<void> {
    const payload: FirestoreUserProfile = {
      ...user,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await this.collection.doc(user.userId).create(payload);
  }

  async updateProfile(
    userId: string,
    fields: Pick<UserProfile, 'name' | 'email' | 'photoURL' | 'timezone'>,
  ): Promise<void> {
    await this.collection.doc(userId).update({
      ...fields,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  private toDomain(data: PersistedFirestoreUserProfile): UserProfile {
    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString(),
    };
  }
}
