import { Component } from '@angular/core';
import { PartialButtonBinder,  CommandBase, WidgetData, KeysData } from 'interacto';

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

  
  public binderRightClick(binder: PartialButtonBinder): void {
    binder
      .toProduce(() => new HelloWorldCommand())
      /*.when(i=> i. === 2)*/
      .bind();
  }

}

class HelloWorldCommand extends CommandBase {

  protected execution(): void | Promise<void> {
    console.log('Hello, world!');
  }

}