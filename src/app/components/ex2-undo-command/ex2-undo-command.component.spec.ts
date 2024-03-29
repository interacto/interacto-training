import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex2UndoCommandComponent } from './ex2-undo-command.component';

describe('Ex2UndoCommandComponent', () => {
  let component: Ex2UndoCommandComponent;
  let fixture: ComponentFixture<Ex2UndoCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ex2UndoCommandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex2UndoCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
