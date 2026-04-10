import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';

@Component({
  selector: 'app-view-flat',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './viewflat.html',
  styleUrls: ['./viewflat.scss']
})
export class ViewFlatComponent implements OnInit {
  flat?: Flat;
  currentUserId = 'user-1';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private flatService: FlatService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUserId = user?.uid ?? '';
    });
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.flatService.getById(id).subscribe({
        next: (flat) => {
          this.flat = flat;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  get isOwner(): boolean {
    return !!this.flat && this.flat.ownerId === this.currentUserId;
  }

  async toggleFavourite(): Promise<void> {
    if (!this.flat?._id || !this.currentUserId) return;

    try {
      await this.flatService.toggleFavourite(this.flat._id, this.currentUserId);
      this.flatService.getById(this.flat._id).subscribe({
        next: (updatedFlat) => {
          this.flat = updatedFlat;
        },
        error: (err) => {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  isFavourite(): boolean {
    return !!this.flat?.favouriteBy?.includes(this.currentUserId);
  }
}
