import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, deleteDoc, updateDoc, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection = collection(firestore, 'users');

  getAllUsers(): Observable<User[]> {
    const q = query(this.usersCollection);
    return collectionData(q, { idField: 'uid' }) as Observable<User[]>;
  }

  getUser(uid: string): Observable<User> {
    return docData(doc(firestore, 'users', uid), { idField: 'uid' }) as Observable<User>;
  }

  updateUser(user: User): Promise<void> {
    return updateDoc(doc(firestore, 'users', user.uid!), {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      isAdmin: !!user.isAdmin
    });
  }

  deleteUser(uid: string): Promise<void> {
    return deleteDoc(doc(firestore, 'users', uid));
  }
}
