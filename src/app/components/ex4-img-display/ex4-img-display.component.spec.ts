import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex4ImgDisplayComponent } from './ex4-img-display.component';

describe('Ex4ImgDisplayComponent', () => {
  let component: Ex4ImgDisplayComponent;
  let fixture: ComponentFixture<Ex4ImgDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ex4ImgDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex4ImgDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
