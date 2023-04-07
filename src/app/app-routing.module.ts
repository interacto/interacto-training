import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickButtonComponent } from './components/ex1-click-button/ex1-click-button.component';
import { UndoCommandComponent } from './components/ex2-undo-command/ex2-undo-command.component';

const routes: Routes = [
  { path: 'ex1-click-button', component: ClickButtonComponent },
  { path: 'ex2-undo-command', component: UndoCommandComponent },
  { path: '', redirectTo: 'ex1-click-button', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
