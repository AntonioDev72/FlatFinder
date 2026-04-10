import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.html',
  styleUrls: ['./all-users.scss']
})
export class AllUsersComponent implements OnInit {
  currentUserIsAdmin = false;
  users: User[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUserIsAdmin = !!user?.isAdmin;
      if (this.currentUserIsAdmin) {
        this.userService.getAllUsers().subscribe({
          next: (users) => {
            this.users = users;
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

  viewProfile(user: User) {
    this.router.navigate(['/profile', user.uid]);
  }
}
