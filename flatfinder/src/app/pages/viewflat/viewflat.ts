import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
    private flatService: FlatService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.flat = this.flatService.getById(id);
    }
  }

  get isOwner(): boolean {
    return !!this.flat && this.flat.ownerId === this.currentUserId;
  }
}