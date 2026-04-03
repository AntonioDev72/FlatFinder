import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';

@Component({
  selector: 'app-new-flat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-flat.html',
  styleUrls: ['./new-flat.scss']
})
export class NewFlatComponent {
  submitted = false;
  flatForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  saveFlat(): void {
    this.submitted = true;

    if (this.flatForm.invalid) {
      this.flatForm.markAllAsTouched();
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
      ownerId: 'user-1',
      ownerName: 'Antonio Amaral',
      ownerEmail: 'antonio@example.com'
    };

    this.flatService.create(newFlat).subscribe({
      next: () => {
        alert('Flat saved successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Error saving flat');
      }
    });
  }

  get f() {
    return this.flatForm.controls;
  }
}