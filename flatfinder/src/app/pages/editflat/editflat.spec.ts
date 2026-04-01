import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editflat } from './editflat';

describe('Editflat', () => {
  let component: Editflat;
  let fixture: ComponentFixture<Editflat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editflat],
    }).compileComponents();

    fixture = TestBed.createComponent(Editflat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
