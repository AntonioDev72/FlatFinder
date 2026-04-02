import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  currentUserId = 'user-1';

  constructor(private flatService: FlatService) {}

  ngOnInit(): void {
    this.loadMyFlats();
  }

  loadMyFlats(): void {
    this.myFlats = this.flatService.getMyFlats(this.currentUserId);
  }

  deleteFlat(id: string): void {
    const confirmed = confirm('Do you want to delete this flat?');
    if (!confirmed) return;

    this.flatService.delete(id);
    this.loadMyFlats();
  }
}