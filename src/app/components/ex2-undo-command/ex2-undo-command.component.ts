import { Component, ElementRef, ViewChild } from '@angular/core';
import { PartialButtonBinder, UndoableCommand } from 'interacto';

@Component({
  selector: 'app-ex2-undo-command',
  templateUrl: './ex2-undo-command.component.html',
  styleUrls: ['./ex2-undo-command.component.css']
})

export class Ex2UndoCommandComponent {

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
    console.log('createMemento ' + this.mementoColor);
  }

  protected execution(): void {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.button.style.backgroundColor = randomColor;
    console.log('execution ' + randomColor);
  }

  public undo(): void {
    this.previousColor = this.button.style.backgroundColor;
    this.button.style.backgroundColor = this.mementoColor;
    console.log('undo ' + this.mementoColor);
  }

  public redo(): void {
    this.mementoColor = this.button.style.backgroundColor;
    this.button.style.backgroundColor = this.previousColor;
    console.log('redo ' + this.previousColor);
  }

  public override getUndoName(): string {
    return 'Change button color';
  }
}