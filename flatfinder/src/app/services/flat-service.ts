import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  query,
  updateDoc,
  where,
  orderBy
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { Observable, from } from 'rxjs';
import { Flat } from '../models/flat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private flatsCollection = collection(firestore, 'flats');

  getAll(filters?: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    sortBy?: 'city' | 'rentPrice' | 'areaSize';
  }): Observable<Flat[]> {
    let q = query(this.flatsCollection, orderBy('createdAt', 'desc'));

    if (filters?.city) {
      q = query(q, where('city', '==', filters.city));
    }
    if (filters?.minPrice != null) {
      q = query(q, where('rentPrice', '>=', filters.minPrice));
    }
    if (filters?.maxPrice != null) {
      q = query(q, where('rentPrice', '<=', filters.maxPrice));
    }
    if (filters?.minArea != null) {
      q = query(q, where('areaSize', '>=', filters.minArea));
    }
    if (filters?.maxArea != null) {
      q = query(q, where('areaSize', '<=', filters.maxArea));
    }

    return collectionData(q, { idField: '_id' }) as Observable<Flat[]>;
  }

  getById(id: string): Observable<Flat> {
    return docData(doc(firestore, 'flats', id), { idField: '_id' }) as Observable<Flat>;
  }

  create(flat: Flat): Promise<Flat> {
    return addDoc(this.flatsCollection, {
      ...flat,
      favouriteBy: flat.favouriteBy ?? [],
      createdAt: new Date()
    }).then((docRef) => ({ ...flat, _id: docRef.id }));
  }

  update(id: string, flat: Flat): Promise<void> {
    return updateDoc(doc(firestore, 'flats', id), {
      city: flat.city,
      streetName: flat.streetName,
      streetNumber: flat.streetNumber,
      areaSize: flat.areaSize,
      hasAC: flat.hasAC,
      yearBuilt: flat.yearBuilt,
      rentPrice: flat.rentPrice,
      dateAvailable: flat.dateAvailable,
      ownerId: flat.ownerId,
      ownerName: flat.ownerName,
      ownerEmail: flat.ownerEmail
    });
  }

  delete(id: string): Promise<void> {
    return deleteDoc(doc(firestore, 'flats', id));
  }

  async toggleFavourite(id: string, userId: string): Promise<void> {
    const flatRef = doc(firestore, 'flats', id);
    const flatSnapshot = await getDoc(flatRef);
    const data = flatSnapshot.data() as Flat | undefined;
    const currentFavourites = data?.favouriteBy ?? [];

    if (currentFavourites.includes(userId)) {
      return updateDoc(flatRef, { favouriteBy: arrayRemove(userId) });
    }
    return updateDoc(flatRef, { favouriteBy: arrayUnion(userId) });
  }

  getFavourites(userId: string): Observable<Flat[]> {
    const q = query(this.flatsCollection, where('favouriteBy', 'array-contains', userId));
    return collectionData(q, { idField: '_id' }) as Observable<Flat[]>;
  }

  getMyFlats(ownerId: string): Observable<Flat[]> {
    const q = query(this.flatsCollection, where('ownerId', '==', ownerId), orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: '_id' }) as Observable<Flat[]>;
  }
}
