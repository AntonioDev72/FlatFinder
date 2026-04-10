import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  uid = '';
  firstName = '';
  lastName = '';
  email = '';
  birthDate = '';
  password = '';
  confirmPassword = '';
  isAdmin = false;
  canEdit = true;
  viewingOtherUser = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const requestedUid = this.route.snapshot.paramMap.get('id');
    this.viewingOtherUser = !!requestedUid && requestedUid !== '';

    this.authService.currentUser$.subscribe((user) => {
      if (!user) {
        if (!requestedUid) {
          this.router.navigate(['/login']);
        }
        return;
      }

      if (requestedUid && requestedUid !== user.uid) {
        if (!user.isAdmin) {
          this.router.navigate(['/']);
          return;
        }

        this.canEdit = false;
        this.loadUserProfile(requestedUid);
      } else {
        this.canEdit = true;
        this.populateProfile(user);
      }
    });
  }

  private populateProfile(user: User) {
    this.uid = user.uid ?? '';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.birthDate = user.birthDate;
    this.isAdmin = !!user.isAdmin;
  }

  private loadUserProfile(uid: string) {
    this.userService.getUser(uid).subscribe((profile) => {
      if (!profile) {
        return;
      }
      this.uid = profile.uid ?? '';
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.email = profile.email;
      this.birthDate = profile.birthDate;
      this.isAdmin = !!profile.isAdmin;
    });
  }

  async updateProfile() {
    if (!this.canEdit) {
      alert('You do not have permission to update this profile.');
      return;
    }

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

    const profile: User = {
      uid: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      isAdmin: this.isAdmin
    };

    try {
      await this.authService.updateProfile(profile, this.password);
      alert('Profile updated successfully!');
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      alert('Profile update failed. Please try again.');
    }
  }
}
