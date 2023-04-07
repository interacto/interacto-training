import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex3TextAreaComponent } from './ex3-text-area.component';

describe('Ex3TextAreaComponent', () => {
  let component: Ex3TextAreaComponent;
  let fixture: ComponentFixture<Ex3TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ex3TextAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex3TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
