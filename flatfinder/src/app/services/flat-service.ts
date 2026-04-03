import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flat } from '../models/flat';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private apiUrl = 'http://localhost:3000/api/flats';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Flat[]> {
    return this.http.get<Flat[]>(this.apiUrl);
  }

  getById(id: string): Observable<Flat> {
    return this.http.get<Flat>(`${this.apiUrl}/${id}`);
  }

  create(flat: Flat): Observable<Flat> {
    return this.http.post<Flat>(this.apiUrl, flat);
  }

  update(id: string, flat: Flat): Observable<Flat> {
    return this.http.put<Flat>(`${this.apiUrl}/${id}`, flat);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMyFlats(ownerId: string): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiUrl}?ownerId=${ownerId}`);
  }

  getFavourites(userId: string): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiUrl}?favouriteUserId=${userId}`);
  }

  toggleFavourite(id: string, userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/favourite`, { userId });
  }
}