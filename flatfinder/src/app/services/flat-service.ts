import { Injectable } from '@angular/core';
import { Flat } from '../models/flat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private storageKey = 'flats';

  getAll(): Flat[] {
  return JSON.parse(localStorage.getItem('flats') || '[]');
  }

  saveAll(flats: Flat[]) {
    localStorage.setItem('flats', JSON.stringify(flats));
  }

  getById(id: string): Flat | undefined {
    return this.getAll().find(flat => flat.id === id);
  }

  create(flat: Flat): void {
    const flats = this.getAll();
    flats.push(flat);
    localStorage.setItem(this.storageKey, JSON.stringify(flats));
  }

  update(updatedFlat: Flat): void {
    const flats = this.getAll().map(flat =>
      flat.id === updatedFlat.id ? updatedFlat : flat
    );
    localStorage.setItem(this.storageKey, JSON.stringify(flats));
  }

  delete(id: string): void {
    const flats = this.getAll().filter(flat => flat.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(flats));
  }

  getMyFlats(ownerId: string): Flat[] {
    return this.getAll().filter(flat => flat.ownerId === ownerId);
  }

  getFavourites(): Flat[] {
    return this.getAll().filter(flat => flat.favourite);
  }

  toggleFavourite(id: string): void {
    const flats = this.getAll().map(flat =>
      flat.id === id
        ? { ...flat, isFavourite: !flat.favourite }
        : flat
    );
    localStorage.setItem(this.storageKey, JSON.stringify(flats));
  }

  removeFavourite(id: string): void {
    const flats = this.getAll().map(flat =>
      flat.id === id
        ? { ...flat, isFavourite: false }
        : flat
    );
    localStorage.setItem(this.storageKey, JSON.stringify(flats));
  }
  
}