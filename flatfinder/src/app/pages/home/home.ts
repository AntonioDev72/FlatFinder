import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {

  flats: Flat[] = [];
  filteredFlats: Flat[] = [];

  // filtros
  city = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(private flatService: FlatService) {}

  ngOnInit() {
    this.flats = this.flatService.getAll();
    this.filteredFlats = this.flats;
  }

  search() {
    this.filteredFlats = this.flats.filter(flat => {
      return (
        (!this.city || flat.city.toLowerCase().includes(this.city.toLowerCase())) &&
        (!this.minPrice || flat.rentPrice >= this.minPrice) &&
        (!this.maxPrice || flat.rentPrice <= this.maxPrice)
      );
    });
  }

  toggleFavorite(flat: Flat) {
    flat.favourite = !flat.favourite;
    this.flatService.saveAll(this.flats);
  }
}