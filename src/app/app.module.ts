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
import {NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { PdfPopoverComponent } from './pdf-popover/pdf-popover.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocumentDataComponent } from './document-data/document-data.component';
import { PaperlessComponent } from './paperless/paperless.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentlistComponent,
    PdfPopoverComponent,
    DocumentDetailsComponent,
    FilterComponent,
    DocumentDataComponent,
    PaperlessComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DetailsDialogComponent
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
    ReactiveFormsModule
  ],
  entryComponents: [
    DetailsDialogComponent
  ],
  providers: [
    DocumentService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
