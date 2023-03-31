import { Component } from '@angular/core';
import { PartialButtonBinder,  CommandBase, PointData, PartialPointBinder } from 'interacto';

@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.css']
})
export class ClickButtonComponent {

  public binderClickAnon(binder: PartialButtonBinder): void {
    binder
      .toProduceAnon(() => console.log('Hello, world!'))
      .bind();
  }

  public binderClickCmd(binder: PartialButtonBinder): void {
    binder
      .toProduce(() => new HelloWorldCommand())
      .bind();
  }

  
  public binderRightClick(binder: PartialPointBinder): void {
    binder
      .toProduce(() => new HelloWorldCommand())
      .when((i: PointData) => i.button === 2)
      .bind();
  }

}

class HelloWorldCommand extends CommandBase {

  protected execution(): void | Promise<void> {
    console.log('Hello, world!');
  }

}