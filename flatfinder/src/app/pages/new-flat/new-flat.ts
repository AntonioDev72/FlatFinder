import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';
import { User } from '../../models/user';

@Component({
  selector: 'app-new-flat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-flat.html',
  styleUrls: ['./new-flat.scss']
})
export class NewFlatComponent implements OnInit {
  currentUser: User | null = null;
  submitted = false;
  flatForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private flatService: FlatService,
    private router: Router
  ) {
    this.flatForm = this.fb.group({
      city: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: [null, [Validators.required, Validators.min(1)]],
      areaSize: [null, [Validators.required, Validators.min(1)]],
      hasAC: [false],
      yearBuilt: [null, [Validators.required, Validators.min(1000)]],
      rentPrice: [null, [Validators.required, Validators.min(1)]],
      dateAvailable: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  async saveFlat(): Promise<void> {
    this.submitted = true;

    if (this.flatForm.invalid) {
      this.flatForm.markAllAsTouched();
      return;
    }

    if (!this.currentUser?.uid) {
      alert('You need to be logged in to add a new flat.');
      return;
    }

    const newFlat: Flat = {
      city: this.flatForm.value.city!,
      streetName: this.flatForm.value.streetName!,
      streetNumber: Number(this.flatForm.value.streetNumber),
      areaSize: Number(this.flatForm.value.areaSize),
      hasAC: !!this.flatForm.value.hasAC,
      yearBuilt: Number(this.flatForm.value.yearBuilt),
      rentPrice: Number(this.flatForm.value.rentPrice),
      dateAvailable: this.flatForm.value.dateAvailable!,
      ownerId: this.currentUser.uid,
      ownerName: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      ownerEmail: this.currentUser.email
    };

    try {
      await this.flatService.create(newFlat);
      alert('Flat saved successfully!');
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
      alert('Error saving flat');
    }
  }

  get f() {
    return this.flatForm.controls;
  }
}
