import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlat } from './new-flat';

describe('NewFlat', () => {
  let component: NewFlat;
  let fixture: ComponentFixture<NewFlat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFlat],
    }).compileComponents();

    fixture = TestBed.createComponent(NewFlat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
