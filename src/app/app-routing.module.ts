import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { PaperlessComponent } from './paperless/paperless.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'documents', component: DocumentlistComponent}
  //{path: 'document', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
