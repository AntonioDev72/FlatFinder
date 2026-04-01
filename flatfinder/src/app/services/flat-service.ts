import { Injectable } from '@angular/core';
import { Flat } from '../models/flat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private storageKey = 'flats';

  getAll(): Flat[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
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
    const flats = this.getAll();
    const index = flats.findIndex(flat => flat.id === updatedFlat.id);
    if (index !== -1) {
      flats[index] = updatedFlat;
      localStorage.setItem(this.storageKey, JSON.stringify(flats));
    }
  }
}