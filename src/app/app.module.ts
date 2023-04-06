import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InteractoModule } from 'interacto-angular';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ClickButtonComponent } from './components/click-button/click-button.component';
import { UndoCommandComponent } from './components/undo-command/undo-command.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ClickButtonComponent,
    UndoCommandComponent
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
