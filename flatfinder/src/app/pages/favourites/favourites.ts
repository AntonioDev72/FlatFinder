import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
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
  currentUserId = '';

  constructor(private flatService: FlatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUserId = user?.uid ?? '';
      this.loadFavourites();
    });
  }

  loadFavourites(): void {
    if (!this.currentUserId) {
      this.favouriteFlats = [];
      return;
    }

    this.flatService.getFavourites(this.currentUserId).subscribe({
      next: (flats) => {
        this.favouriteFlats = flats;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  async removeFavourite(id: string): Promise<void> {
    try {
      await this.flatService.toggleFavourite(id, this.currentUserId);
      this.loadFavourites();
    } catch (err) {
      console.error(err);
    }
  }
}
