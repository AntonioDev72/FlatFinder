import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  birthDate = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    if (!this.firstName || !this.lastName || !this.email || !this.birthDate || !this.password || !this.confirmPassword) {
      alert('All fields are required!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const age = new Date().getFullYear() - new Date(this.birthDate).getFullYear();
    if (age < 18 || age > 120) {
      alert('Minimum age is 18 and maximum age is 120.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

    if (!passwordRegex.test(this.password)) {
      alert('Password must contain a letter, a number and a special character');
      return;
    }

    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      isAdmin: false
    };

    try {
      await this.authService.register(user, this.password);
      alert('Registration successful!');
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  }
}
