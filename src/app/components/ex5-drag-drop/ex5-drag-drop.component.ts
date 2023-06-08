import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Bindings, UndoHistoryBase, CommandBase } from 'interacto';

/* The following code is based on the example provided in https://github.com/interacto/example-angular
*/

@Component({
  selector: 'app-ex5-drag-drop',
  templateUrl: './ex5-drag-drop.component.html',
  styleUrls: ['./ex5-drag-drop.component.css']
})
export class Ex5DragDropComponent implements AfterViewInit {
  images = [
    'https://picsum.photos/seed/1/600',
    'https://picsum.photos/seed/2/600',
    'https://picsum.photos/seed/3/600',
    'https://picsum.photos/seed/4/600'
  ];
  @ViewChild('bin')
  public bin!: ElementRef<HTMLImageElement>;

  public mementoX!: string;
  public mementoY!: string;
  public mementoCSSPosition!: string;
  public pic!: HTMLImageElement;
  public sourceIndex!: number;

  public constructor(public bindings: Bindings<UndoHistoryBase>) {}

  public ngAfterViewInit(): void {

    // This binder creates the command that allows the user to move a an image to trash
    this.bindings.dndBinder(true)
      .on(window.document.body)
      .toProduce(() => new DeleteItem(this))
      // Checks if the user picked a valid element
      .when(i => i.src.target instanceof HTMLImageElement)
      .first((_, i) => {
        this.pic = (i.src.target as HTMLImageElement);
        this.sourceIndex = this.images.indexOf(this.pic.src);
        // Saves the initial state of the image's style to be able to restore it if the command can't be executed
        this.mementoX = this.pic.style.left;
        this.mementoY = this.pic.style.top;
        this.mementoCSSPosition = this.pic.style.position;

        this.pic.style.position = 'relative';
        this.pic.style.zIndex = '999';

      })
      .then((c, i) => {
        
        this.pic!.style.left = `${i.diffClientX}px`;
        this.pic!.style.top = `${i.diffClientY}px`;
        
        if (this.insideRectangle(this.bin.nativeElement.getBoundingClientRect(), i.tgt.clientX, i.tgt.clientY) && this.pic.src != this.bin.nativeElement.src) {
          c.inside = true;
        } else {
          c.inside = false;
        }


      })
      // Resets the position of the image if the command is invalid or cancelled
      .ifCannotExecute(() => {
        this.pic!.style.left = this.mementoX;
        this.pic!.style.top = this.mementoY;
        this.pic!.style.position = this.mementoCSSPosition;
      })
      .cancel(() => {
        this.pic.style.left = this.mementoX;
        this.pic!.style.top = this.mementoY;
        this.pic!.style.position = this.mementoCSSPosition;
      })
      .preventDefault()
      .bind();
  }

  private insideRectangle(rec: DOMRect, x: number, y: number): boolean {
    return x >= rec.x && y >= rec.y && x <= (rec.x + rec.width) && y <= (rec.y + rec.height);
  }

}

export class DeleteItem extends CommandBase {

  public inside: boolean = false;

  constructor(private component: Ex5DragDropComponent) {
    super();
  }

  protected execution(): void {
    const index = this.component.sourceIndex;
    this.component.images.splice(index, 1 );
  }

  public override canExecute(): boolean {
    return this.inside;
  }

}

