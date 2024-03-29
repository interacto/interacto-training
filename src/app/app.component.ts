import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('handle')
  public handle: ElementRef<SVGCircleElement> | undefined;

  @ViewChild('spring')
  public spring: ElementRef<SVGLineElement> | undefined;
  title = 'interacto-training';
}
