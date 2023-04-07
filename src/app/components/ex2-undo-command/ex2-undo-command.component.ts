import { Component, ElementRef, ViewChild } from '@angular/core';
import { PartialButtonBinder, UndoableCommand } from 'interacto';

@Component({
  selector: 'app-ex2-undo-command',
  templateUrl: './ex2-undo-command.component.html',
  styleUrls: ['./ex2-undo-command.component.css']
})

export class UndoCommandComponent {

  public binderColor(binder: PartialButtonBinder, button: HTMLButtonElement | HTMLElement): void {
    binder
      .toProduce(() => new ChangeButtonColor(button))
      .bind();
  }
}



export class ChangeButtonColor extends UndoableCommand {
  private mementoColor: string = '';
  private previousColor: string = '';
  

  constructor(private readonly button: HTMLButtonElement | HTMLElement) {
    super();
  }

  protected override createMemento(): void {
    this.mementoColor = this.button.style.backgroundColor;
  }

  protected execution(): void {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.button.style.backgroundColor = randomColor;
  }

  public undo(): void {
    this.previousColor = this.button.style.backgroundColor;
    this.button.style.backgroundColor = this.mementoColor;
  }

  public redo(): void {
    this.mementoColor = this.button.style.backgroundColor;
    this.button.style.backgroundColor = this.previousColor;
  }

  public override getUndoName(): string {
    return 'Change button color';
  }
}