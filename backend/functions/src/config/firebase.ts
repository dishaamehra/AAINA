import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const adminAuth = admin.auth();

export { admin, db, adminAuth };