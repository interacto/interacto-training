import { Component, ElementRef, ViewChild } from '@angular/core';
import { PartialButtonBinder, UndoableCommand } from 'interacto';

@Component({
  selector: 'app-undo-command',
  templateUrl: './undo-command.component.html',
  styleUrls: ['./undo-command.component.css']
})

export class UndoCommandComponent {

  @ViewChild('log', { static: false }) logRef!: ElementRef<HTMLPreElement>;

  public binderColor(binder: PartialButtonBinder, button: HTMLButtonElement | HTMLElement): void {
    binder
      .toProduce(() => new ChangeButtonColor(button, this.logRef.nativeElement))
      .bind();
  }
}



export class ChangeButtonColor extends UndoableCommand {
  private mementoColor: string = '';
  private previousColor: string = '';
  private logBox: HTMLPreElement;
  

  constructor(private readonly button: HTMLButtonElement | HTMLElement, logElement: HTMLPreElement) {
    super();
    this.logBox = logElement;
  }

  protected override createMemento(): void {
    this.mementoColor = this.button.style.backgroundColor;
  }

  protected execution(): void {
    this.logBox.textContent += 'New color\n';
    this.logBox.scrollTop = this.logBox.scrollHeight;
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.button.style.backgroundColor = randomColor;
  }

  public undo(): void {
    this.logBox.textContent += 'Undo color\n';
    this.logBox.scrollTop = this.logBox.scrollHeight;
    this.previousColor = this.button.style.backgroundColor;
    this.button.style.backgroundColor = this.mementoColor;
  }

  public redo(): void {
    this.logBox.textContent += 'Redo color\n';
    this.logBox.scrollTop = this.logBox.scrollHeight;
    this.mementoColor = this.button.style.backgroundColor;
    this.button.style.backgroundColor = this.previousColor;
  }

  public override getUndoName(): string {
    return 'Change button color';
  }
}