import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favourites.html',
  styleUrls: ['./favourites.scss']
})
export class FavouritesComponent implements OnInit {
  favouriteFlats: Flat[] = [];
  currentUserId = 'user-1';

  constructor(private flatService: FlatService) {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  loadFavourites(): void {
    this.flatService.getFavourites(this.currentUserId).subscribe({
      next: (flats) => {
        this.favouriteFlats = flats;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  removeFavourite(id: string): void {
    this.flatService.toggleFavourite(id, this.currentUserId).subscribe({
      next: () => {
        this.loadFavourites();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}