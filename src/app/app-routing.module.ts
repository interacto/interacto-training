import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex1ClickButtonComponent } from './components/ex1-click-button/ex1-click-button.component';
import { Ex2UndoCommandComponent } from './components/ex2-undo-command/ex2-undo-command.component';
import { Ex3TextAreaComponent } from './components/ex3-text-area/ex3-text-area.component';
import { Ex4ImgDisplayComponent } from './components/ex4-img-display/ex4-img-display.component';
import { Ex5DragDropComponent } from './components/ex5-drag-drop/ex5-drag-drop.component';
import { Ex6CanvaSvgComponent } from './components/ex6-canva-svg/ex6-canva-svg.component';

const routes: Routes = [
  { path: 'ex1-click-button', component: Ex1ClickButtonComponent },
  { path: 'ex2-undo-command', component: Ex2UndoCommandComponent },
  { path: 'ex3-text-area', component: Ex3TextAreaComponent },
  { path: 'ex4-img-display', component: Ex4ImgDisplayComponent },
  { path: 'ex5-drag-drop', component: Ex5DragDropComponent },
  { path: 'ex6-canva-svg', component: Ex6CanvaSvgComponent },
  { path: '', redirectTo: 'ex1-click-button', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
