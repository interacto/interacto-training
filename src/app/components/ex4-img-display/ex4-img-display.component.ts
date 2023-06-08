import { AfterViewInit, Component, Input } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {Bindings, UndoHistoryBase, CommandBase} from 'interacto';

/* The following code is based on the example provided in https://github.com/interacto/example-angular
*/

@Component({
  selector: 'app-ex4-img-display',
  templateUrl: './ex4-img-display.component.html',
  styleUrls: ['./ex4-img-display.component.css']
})
export class Ex4ImgDisplayComponent implements AfterViewInit {

  @Input() tabActive: boolean = true;

  @ViewChild('carousel')
  private carousel: ElementRef<HTMLDivElement> | undefined;

  @ViewChild('container')
  private container: ElementRef<HTMLDivElement> | undefined;

  pictures = [
    {src: 'https://picsum.photos/seed/1/600'},
    {src: 'https://picsum.photos/seed/2/600'},
    {src: 'https://picsum.photos/seed/3/600'},
    {src: 'https://picsum.photos/seed/4/600'}
  ];

  currentPicture = 0;

  constructor(public bindings: Bindings<UndoHistoryBase>) {
  }

  ngAfterViewInit(): void {
    this.container!.nativeElement.style.width = '100%';
    this.container!.nativeElement.style.height = '100%';

    this.bindings.keyDownBinder(true)
      .on(document.body)
      .toProduce(() => new ChangeCurrentPicture(this.pictures.length, this, true))
      .with(false, 'ArrowRight')
      .when(() => this.tabActive)
      .bind();

    this.bindings.keyDownBinder(true)
      .on(document.body)
      .toProduce(() => new ChangeCurrentPicture(this.pictures.length, this, false))
      .with(false, 'ArrowLeft')
      .when(() => this.tabActive)
      .bind();

    this.bindings.wheelBinder()
      .on(this.carousel!.nativeElement)
      .toProduce((i) => new Zoom(this.container!.nativeElement, i.deltaY)
      )
      .when((i) => i.ctrlKey)
      // Disables browser zoom when targeting the pictures
      .preventDefault()
      .bind();
  }
}

export class ChangeCurrentPicture extends CommandBase {

  constructor(private length: number, private ImgDisplay: Ex4ImgDisplayComponent, private moveForward: boolean) {
    super();
  }

  protected execution(): void {
    if (this.moveForward) {
      this.ImgDisplay.currentPicture++;
    } else {
      this.ImgDisplay.currentPicture--;
    }
  }

  // If the targeted index doesn't exist in the picture collection, the command cannot execute
  override canExecute(): boolean {
    if (this.moveForward) {
      return this.ImgDisplay.currentPicture < this.length - 1;
    } else {
      return this.ImgDisplay.currentPicture > 0;
    }
  }
}

export class Zoom extends CommandBase {
  private currentZoom = 100;
  private maxZoom = 500;
  private minZoom = 20;
  private speed = 0.1;

  constructor(private container: HTMLDivElement, private delta: number) {
    super();
    this.currentZoom = parseFloat(container.style.width);
    this.delta *= -1; // Scrolling upwards (negative y delta) should increase zoom
  }

  protected execution(): void {
    this.currentZoom += this.delta * 0.1;

    this.container.style.width = this.currentZoom + '%';
    this.container.style.height = this.currentZoom + '%';
  }

  // Allows execution if the projected zoom level doesn't exceed limits
  override canExecute(): boolean {
    return (this.delta > 0 && this.currentZoom + this.delta * this.speed < this.maxZoom) ||
      (this.delta < 0 && this.currentZoom + this.delta * this.speed > this.minZoom);
  }
}