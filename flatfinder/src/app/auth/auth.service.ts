import { Injectable } from '@angular/core';
import { auth, firestore } from '../firebase';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(user: User, password: string): Promise<void> {
    return createUserWithEmailAndPassword(auth, user.email, password)
      .then((credential) => {
        const userRef = doc(firestore, 'users', credential.user.uid);
        return setDoc(userRef, {
          uid: credential.user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthDate: user.birthDate,
          isAdmin: false,
          createdAt: serverTimestamp()
        });
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }

  deleteAccount(): Promise<void> {
    if (!auth.currentUser) {
      return Promise.reject(new Error('No authenticated user.'));
    }
    const uid = auth.currentUser.uid;
    return deleteDoc(doc(firestore, 'users', uid)).then(() => deleteUser(auth.currentUser!));
  }

  get currentUser$(): Observable<User | null> {
    return new Observable((subscriber) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          if (!firebaseUser) {
            subscriber.next(null);
            return;
          }

          const userRef = doc(firestore, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userRef);

          if (!userDoc.exists()) {
            subscriber.next(null);
            return;
          }

          const data = userDoc.data() as User;
          subscriber.next({ ...data, uid: firebaseUser.uid });
        },
        (error) => subscriber.error(error)
      );

      return unsubscribe;
    });
  }

  getProfile(uid: string): Promise<User | null> {
    return getDoc(doc(firestore, 'users', uid)).then((snapshot) => {
      if (!snapshot.exists()) {
        return null;
      }
      return snapshot.data() as User;
    });
  }

  updateProfile(profile: User, password?: string) {
    const uid = profile.uid;
    if (!uid) {
      return Promise.reject(new Error('User UID is required for profile update.'));
    }

    const userRef = doc(firestore, 'users', uid);
    const updatePayload: Partial<User> = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthDate: profile.birthDate,
      email: profile.email,
      isAdmin: !!profile.isAdmin
    };

    return updateDoc(userRef, updatePayload).then(async () => {
      if (auth.currentUser && auth.currentUser.uid === uid && auth.currentUser.email !== profile.email) {
        await updateEmail(auth.currentUser, profile.email);
      }
      if (password && auth.currentUser && auth.currentUser.uid === uid) {
        await updatePassword(auth.currentUser, password);
      }
    });
  }

  get currentUserId(): string | null {
    return auth.currentUser?.uid ?? null;
  }
}
