import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InteractoModule } from 'interacto-angular';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { Ex1ClickButtonComponent } from './components/ex1-click-button/ex1-click-button.component';
import { Ex2UndoCommandComponent } from './components/ex2-undo-command/ex2-undo-command.component';
import { Ex3TextAreaComponent } from './components/ex3-text-area/ex3-text-area.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    Ex1ClickButtonComponent,
    Ex2UndoCommandComponent,
    Ex3TextAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InteractoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
