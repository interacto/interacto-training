import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoCommandComponent } from './undo-command.component';

describe('UndoCommandComponent', () => {
  let component: UndoCommandComponent;
  let fixture: ComponentFixture<UndoCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndoCommandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndoCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
