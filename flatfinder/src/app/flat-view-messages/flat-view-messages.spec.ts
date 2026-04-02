import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatViewMessages } from './flat-view-messages';

describe('FlatViewMessages', () => {
  let component: FlatViewMessages;
  let fixture: ComponentFixture<FlatViewMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatViewMessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatViewMessages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
