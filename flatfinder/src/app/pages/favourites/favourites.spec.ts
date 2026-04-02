import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favourites } from './favourites';

describe('Favourites', () => {
  let component: Favourites;
  let fixture: ComponentFixture<Favourites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favourites],
    }).compileComponents();

    fixture = TestBed.createComponent(Favourites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
