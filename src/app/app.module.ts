import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import {DocumentService} from './document.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './auth-interceptor';
import { MaterialModule } from './material/material.module';
import { NgbModule, NgbModalModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfPopoverComponent } from './pdf-popover/pdf-popover.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocumentDataComponent } from './document-data/document-data.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { RawTextComponent } from './raw-text/raw-text.component';
import { ResolvePipe } from './resolve.pipe';
import { ResolveConcatPipe } from './resolve-concat.pipe';
import { MovableBackgroundComponent } from './movable-background/movable-background.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsProviderService } from './settings-provider.service';
import { LayoutModule } from '@angular/cdk/layout';
import { CorrespondentListComponent } from './correspondent-list/correspondent-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentlistComponent,
    PdfPopoverComponent,
    DocumentDetailsComponent,
    FilterComponent,
    DocumentDataComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DetailsDialogComponent,
    RawTextComponent,
    ResolvePipe,
    ResolveConcatPipe,
    MovableBackgroundComponent,
    TagListComponent,
    SettingsComponent,
    CorrespondentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    NgbModalModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
  entryComponents: [
    DetailsDialogComponent
  ],
  providers: [
    DocumentService,
    SettingsProviderService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
