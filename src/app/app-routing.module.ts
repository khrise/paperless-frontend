import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { HomeComponent } from './home/home.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { SettingsComponent } from './settings/settings.component';
import { CorrespondentListComponent } from './correspondent-list/correspondent-list.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'documents', children: [
      { path: '', component: DocumentlistComponent },
      { path: ':id', component: DocumentDetailsComponent },
    ]
  },
  {
    path: 'tags', children: [
      { path: '', component: TagListComponent }
    ]
  },
  {
    path: 'correspondents', children: [
      { path: '', component: CorrespondentListComponent }
    ]
  },
  { path: 'settings', component: SettingsComponent },
  { path: 'logs', component: LogsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
