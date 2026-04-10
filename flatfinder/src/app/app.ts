import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  async deleteAccount() {
    const confirmed = confirm('Do you really want to delete your account?');
    if (!confirmed) {
      return;
    }

    try {
      await this.authService.deleteAccount();
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
      alert('Account deletion failed. Please try again.');
    }
  }
}
