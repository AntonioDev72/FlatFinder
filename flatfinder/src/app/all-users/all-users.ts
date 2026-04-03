import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.html',
  styleUrls: ['./all-users.scss']
})
export class AllUsersComponent {
  currentUserIsAdmin = true;
  constructor(private router: Router) {}
  users = [
    { firstName: 'Lucas', lastName: 'Sartori', email: 'lucas@email.com', flatsCount: 2, isAdmin: true },
    { firstName: 'Augusto', lastName: 'Pioner', email: 'augusto@email.com', flatsCount: 1, isAdmin: false }
  ];

  viewProfile(user: any) {
    this.router.navigate(['/profile']);
}
}
