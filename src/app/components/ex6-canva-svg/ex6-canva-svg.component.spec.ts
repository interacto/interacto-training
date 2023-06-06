import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex6CanvaSvgComponent } from './ex6-canva-svg.component';

describe('Ex6CanvaSvgComponent', () => {
  let component: Ex6CanvaSvgComponent;
  let fixture: ComponentFixture<Ex6CanvaSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ex6CanvaSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex6CanvaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
