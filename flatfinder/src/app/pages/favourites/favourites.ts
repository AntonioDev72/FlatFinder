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

  constructor(private flatService: FlatService) {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  loadFavourites(): void {
    this.favouriteFlats = this.flatService.getFavourites();
  }

  removeFavourite(id: string): void {
    this.flatService.removeFavourite(id);
    this.loadFavourites();
  }
}