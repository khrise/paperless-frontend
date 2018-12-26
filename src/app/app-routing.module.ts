import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { PaperlessComponent } from './paperless/paperless.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'documents/:id', component: DocumentDetailsComponent},
  { path: 'documents', component: DocumentlistComponent},
  //{ path: 'tagss/:id', component: DocumentDetailsComponent},
  { path: 'tags', component: TagListComponent},
  { path: 'settings', component: SettingsComponent}
  //{path: 'document', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
