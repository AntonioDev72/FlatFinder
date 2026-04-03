import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';

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
  currentUserId = 'user-1';

  city = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minArea: number | null = null;
  maxArea: number | null = null;

  constructor(private flatService: FlatService) {}

  ngOnInit(): void {
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

    this.filteredFlats = result;
  }

  toggleFavourite(flat: Flat): void {
    if (!flat._id) return;

    this.flatService.toggleFavourite(flat._id, this.currentUserId).subscribe({
      next: () => {
        this.loadFlats();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  isFavourite(flat: Flat): boolean {
    return !!flat.favouriteBy?.includes(this.currentUserId);
  }
}