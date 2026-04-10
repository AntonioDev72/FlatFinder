import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';

@Component({
  selector: 'app-myflats',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './myflats.html',
  styleUrls: ['./myflats.scss']
})
export class MyflatsComponent implements OnInit {
  myFlats: Flat[] = [];
  currentUserId = '';

  constructor(private flatService: FlatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUserId = user?.uid ?? '';
      this.loadMyFlats();
    });
  }

  loadMyFlats(): void {
    if (!this.currentUserId) {
      this.myFlats = [];
      return;
    }

    this.flatService.getMyFlats(this.currentUserId).subscribe({
      next: (flats) => {
        this.myFlats = flats;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  async deleteFlat(id: string): Promise<void> {
    const confirmed = confirm('Do you want to delete this flat?');
    if (!confirmed) return;

    try {
      await this.flatService.delete(id);
      this.loadMyFlats();
    } catch (err) {
      console.error(err);
    }
  }
}
