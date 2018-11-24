import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentlistComponent } from './documentlist/documentlist.component';

const routes: Routes = [
  { path: '', component: DocumentlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
