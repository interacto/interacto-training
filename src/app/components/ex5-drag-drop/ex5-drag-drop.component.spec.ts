import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex5DragDropComponent } from './ex5-drag-drop.component';

describe('Ex5DragDropComponent', () => {
  let component: Ex5DragDropComponent;
  let fixture: ComponentFixture<Ex5DragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ex5DragDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex5DragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
