import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickButtonComponent } from './components/click-button/click-button.component';
import { UndoCommandComponent } from './components/undo-command/undo-command.component';

const routes: Routes = [
  { path: 'click-button', component: ClickButtonComponent },
  { path: 'undo-command', component: UndoCommandComponent },
  { path: '', redirectTo: 'click-button', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
