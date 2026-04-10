import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  flats: Flat[] = [];
  filteredFlats: Flat[] = [];
  currentUserId = '';

  city = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minArea: number | null = null;
  maxArea: number | null = null;
  sortBy: 'city' | 'rentPrice' | 'areaSize' | '' = '';

  constructor(private flatService: FlatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUserId = user?.uid ?? '';
    });
    this.loadFlats();
  }

  loadFlats(): void {
    this.flatService.getAll().subscribe({
      next: (flats) => {
        this.flats = flats;
        this.filteredFlats = flats;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  search(): void {
    let result = [...this.flats];

    if (this.city.trim()) {
      result = result.filter(flat =>
        flat.city.toLowerCase().includes(this.city.toLowerCase())
      );
    }

    if (this.minPrice !== null) {
      result = result.filter(flat => flat.rentPrice >= this.minPrice!);
    }

    if (this.maxPrice !== null) {
      result = result.filter(flat => flat.rentPrice <= this.maxPrice!);
    }

    if (this.minArea !== null) {
      result = result.filter(flat => flat.areaSize >= this.minArea!);
    }

    if (this.maxArea !== null) {
      result = result.filter(flat => flat.areaSize <= this.maxArea!);
    }

    if (this.sortBy) {
      result.sort((a, b) => {
        if (this.sortBy === 'city') {
          return a.city.localeCompare(b.city);
        }
        if (this.sortBy === 'rentPrice') {
          return a.rentPrice - b.rentPrice;
        }
        return a.areaSize - b.areaSize;
      });
    }

    this.filteredFlats = result;
  }

  async toggleFavourite(flat: Flat): Promise<void> {
    if (!flat._id || !this.currentUserId) {
      return;
    }

    try {
      await this.flatService.toggleFavourite(flat._id, this.currentUserId);
      this.loadFlats();
    } catch (err) {
      console.error(err);
    }
  }

  isFavourite(flat: Flat): boolean {
    return !!flat.favouriteBy?.includes(this.currentUserId);
  }
}
