import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent {
  firstName = 'Lucas';
  lastName = 'Sartori';
  email = 'lucas@email.com';
  birthDate = '2005-01-01';
  password = '';
  confirmPassword = '';
  isAdmin = false;
  constructor(private router: Router) {}

  updateProfile() {
    if (!this.firstName || !this.lastName || !this.email || !this.birthDate) {
      alert('All fields are required!');
      return;
    }

    const age = new Date().getFullYear() - new Date(this.birthDate).getFullYear();
    if (age < 18 || age > 120) {
      alert('Age must be between 18 and 120 years.');
      return;
    }

    if (this.password && this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    alert('Profile updated successfully!');

    this.router.navigate(['/']);
  }
}
