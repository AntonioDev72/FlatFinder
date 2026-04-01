import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatService } from '../../services/flat-service';
import { Flat } from '../../models/flat';

@Component({
  selector: 'app-edit-flat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editflat.html',
  styleUrls: ['./editflat.scss']
})
export class EditFlatComponent implements OnInit {
  flatId = '';
  currentFlat?: Flat;
  flatForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flatService: FlatService
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
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.flatId = id;
    const flat = this.flatService.getById(id);

    if (!flat) return;

    this.currentFlat = flat;
    this.flatForm.patchValue({
      city: flat.city,
      streetName: flat.streetName,
      streetNumber: flat.streetNumber,
      areaSize: flat.areaSize,
      hasAC: flat.hasAC,
      yearBuilt: flat.yearBuilt,
      rentPrice: flat.rentPrice,
      dateAvailable: flat.dateAvailable
    });
  }

  updateFlat(): void {
    if (this.flatForm.invalid || !this.currentFlat) {
      this.flatForm.markAllAsTouched();
      return;
    }

    const updatedFlat: Flat = {
      ...this.currentFlat,
      city: this.flatForm.value.city!,
      streetName: this.flatForm.value.streetName!,
      streetNumber: Number(this.flatForm.value.streetNumber),
      areaSize: Number(this.flatForm.value.areaSize),
      hasAC: !!this.flatForm.value.hasAC,
      yearBuilt: Number(this.flatForm.value.yearBuilt),
      rentPrice: Number(this.flatForm.value.rentPrice),
      dateAvailable: this.flatForm.value.dateAvailable!
    };

    this.flatService.update(updatedFlat);
    this.router.navigate(['/']);
  }

  get f() {
    return this.flatForm.controls;
  }
}