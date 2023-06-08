import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Bindings, TreeUndoHistory, UndoableCommand, PointData } from 'interacto';
import { interactoTreeUndoProviders, TreeHistoryComponent } from 'interacto-angular';
import { AppComponent } from '../../app.component';

/* The following code is based on the example provided in https://github.com/interacto/example-angular
*/

@Component({
  selector: 'app-ex6-canva-svg',
  templateUrl: './ex6-canva-svg.component.html',
  styleUrls: ['./ex6-canva-svg.component.css'],
  providers: [interactoTreeUndoProviders()]
})

export class Ex6CanvaSvgComponent implements AfterViewInit {

  @ViewChild('canvas')
  private canvas: ElementRef<SVGSVGElement> | undefined;

  @ViewChild('treeComp')
  private treeComp: TreeHistoryComponent | undefined;

  public widthHistory: string = '20%';

  

  public constructor(public undoHistory: TreeUndoHistory, public bindings: Bindings<TreeUndoHistory>, private appComponent: AppComponent) { }

  public ngAfterViewInit(): void {

    this.canvas!.nativeElement.addEventListener("touchstart", evt => {
      evt.preventDefault();
    })

    this.treeComp!.svgViewportWidth = this.canvas!.nativeElement.clientWidth;
    this.treeComp!.svgViewportHeight = this.canvas!.nativeElement.clientHeight;

    this.bindings.dbleClickBinder()
    .on(this.canvas!)
    .toProduce(i => new DrawRect(i, this.canvas!.nativeElement))
    .bind();
    


    this.bindings.longMouseDownBinder(1000)
    .onDynamic(this.canvas!)
    .toProduce(i => new DeleteElt(this.canvas!.nativeElement, i.currentTarget as SVGRectElement))
    .when(i => i.currentTarget instanceof SVGRectElement)
    // Prevents the context menu from popping up
    .preventDefault()
    .bind();



    this.bindings.reciprocalDndBinder(this.appComponent.handle!, this.appComponent.spring!)
    .onDynamic(this.canvas!)
    .toProduce(i => new MoveRect(i.src.target as SVGRectElement, this.canvas!.nativeElement))
    .first((_, i) => {
      (i.src.target as HTMLElement).style.cursor = 'pointer';
    })
    .then((c, i) => {
      c.vectorX = i.diffClientX;
      c.vectorY = i.diffClientY;
    })
    .endOrCancel(i => {
      (i.src.target as HTMLElement).style.cursor = 'default';
    })
    .when(i => i.tgt.button === 0)
    .continuousExecution()
    .bind();

  }

}

export abstract class SVGCommand extends UndoableCommand {
  private cacheSnap: SVGElement | undefined;

  protected constructor(protected readonly svgdoc: SVGSVGElement) {
    super();
  }

  public override getVisualSnapshot(): SVGElement {
    /**
     * Angular call this method multiple times to refresh the page.
     * So caching the snapshot
     */
    if(this.cacheSnap === undefined) {
      this.cacheSnap = this.svgdoc.cloneNode(true) as SVGElement;
    }
    return this.cacheSnap;
  }
}


export class DrawRect extends SVGCommand {
  private rec: SVGRectElement | undefined;
  private x: number | undefined;
  private y: number | undefined;
  private height: number | undefined;
  private width: number | undefined;
  private canvasRect: DOMRect | undefined;

  constructor(private i: PointData, svgdoc: SVGSVGElement) {
    super(svgdoc);
  }

  protected execution(): void {

    
    // this variable is used to get the position of the canvas in the page to 
    // be able to draw the rectangle at the right place
    this.canvasRect = this.svgdoc.getBoundingClientRect();

    if (this.rec === undefined) {
      this.rec = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      this.svgdoc.appendChild(this.rec);
    }


    this.setRect(this.i.clientX - this.canvasRect.left, this.i.clientY - this.canvasRect.top, 150, 150);

    this.rec.setAttribute('x', this.x!.toString());
    this.rec.setAttribute('y', this.y!.toString());
    this.rec.setAttribute('height', this.height!.toString());
    this.rec.setAttribute('width', this.width!.toString());
    this.rec.setAttribute('tabindex', '0');
  }

  public setRect(x: number, y: number, height: number, width: number): void {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  public undo(): void {
    this.svgdoc.removeChild(this.rec!);
  }

  public redo(): void {
    this.svgdoc.appendChild(this.rec!);
  }

  public override getUndoName(): string {
    return 'Draw Rectangle';
  }

}

export class MoveRect extends SVGCommand {
  constructor(private readonly rec: SVGRectElement, svgdoc: SVGSVGElement) {
    super(svgdoc);
  }

  private mementoX: number | undefined;
  private mementoY: number | undefined;
  public vectorX: number | undefined;
  public vectorY: number | undefined;

  protected override createMemento() {
    this.mementoX = this.rec.x.baseVal.value;
    this.mementoY = this.rec.y.baseVal.value;
  }

  protected execution(): void {
    this.rec.setAttribute('x', String(this.mementoX! + this.vectorX!));
    this.rec.setAttribute('y', String(this.mementoY! + this.vectorY!));
  }

  redo(): void {
    this.execution();
  }

  undo(): void {
    this.rec.setAttribute('x', String(this.mementoX));
    this.rec.setAttribute('y', String(this.mementoY));
  }

  public override getUndoName(): string {
    return 'Move rectangle';
  }
}

export class DeleteElt extends UndoableCommand {

  public constructor(private readonly svgDoc: SVGSVGElement, private readonly svgElt: SVGRectElement) {
    super();
  }

  protected execution(): void {
    this.redo();
  }

  public override getUndoName(): string {
    return 'Delete SVG element';
  }

  public redo(): void {
    this.svgDoc.removeChild(this.svgElt);
  }

  public undo(): void {
    this.svgDoc.appendChild(this.svgElt);
  }
}