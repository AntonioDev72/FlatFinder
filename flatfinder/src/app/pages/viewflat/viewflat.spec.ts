import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewflat } from './viewflat';

describe('Viewflat', () => {
  let component: Viewflat;
  let fixture: ComponentFixture<Viewflat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewflat],
    }).compileComponents();

    fixture = TestBed.createComponent(Viewflat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
