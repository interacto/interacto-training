import { Component } from '@angular/core';
import {LogLevel, PartialButtonBinder, PartialTextInputBinder, UndoableCommand} from 'interacto';

@Component({
  selector: 'app-ex3-text-area',
  templateUrl: './ex3-text-area.component.html',
  styleUrls: ['./ex3-text-area.component.css']
})
export class Ex3TextAreaComponent {

  binderText(binder: PartialTextInputBinder, textArea: HTMLTextAreaElement): void {
    binder
      .toProduce(() => new SetText(textArea))
      .then((c, i) => c.text = i.widget?.value ?? '')
      .bind();
  }


}

export class SetText extends UndoableCommand {
  private mementoText: string = '';
  private newText: string = '';

  constructor(private readonly textArea: HTMLTextAreaElement) {
    super();
    this.mementoText = this.textArea.value.slice(0, -1);
    console.log('createMemento ' + this.mementoText);
  }

  protected override createMemento(): void {

  }

  protected execution(): void {
    this.textArea.value = this.newText;
    console.log('execution ' + this.newText);

  }

  public override canExecute(): boolean {
    return this.newText !== undefined;
  }

  public set text(txt: string) {
    this.newText = txt;
    console.log('set text ' + this.newText);
  }

  public undo(): void {
    this.textArea.value = this.mementoText;
    console.log('undo ' + this.newText);
  }

  public redo(): void {
    this.textArea.value = this.newText;
    console.log('redo ' + this.newText);
  }

  public override getUndoName(): string {
    return 'Set text';
  }

  public override getVisualSnapshot(): SVGElement | string | undefined {
    return this.newText;
  }
}