import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex1ClickButtonComponent } from './ex1-click-button.component';

describe('Ex1ClickButtonComponent', () => {
  let component: Ex1ClickButtonComponent;
  let fixture: ComponentFixture<Ex1ClickButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ex1ClickButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex1ClickButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
