import { Component, OnInit, Input, Sanitizer, ViewChild, OnChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Document } from '../document';
import { EnvironmentService } from '../environment.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as PDFObject from 'pdfobject';

@Component({
  selector: 'app-pdf-popover',
  templateUrl: './pdf-popover.component.html',
  styleUrls: ['./pdf-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfPopoverComponent implements OnInit, OnChanges {

  @Input()
  doc: Document

  mode: DisplayMode;

  baseUrl: string

  pdfObject: SafeHtml

  constructor(private env: EnvironmentService,
    private _sanitizer: DomSanitizer) {
      this.baseUrl = env.getBaseUrl();
    }

  ngOnInit() {
    this.initFromDoc();
  }

  ngOnChanges() {
    this.initFromDoc();
  }

  public initFromDoc() {
    if (! this.doc) {
      return;
    }
    this.mode = this.doc.file_type === "pdf" ? "pdf" : "img";
    let url = this.env.getBaseUrl() + this.doc.download_url
    if (this.mode === "pdf") {
      this.pdfObject = this._sanitizer.bypassSecurityTrustHtml(
        "<object data='" + url + "'" +// "#view=FitH' " + 
        " type='application/pdf' class='embed-responsive-item'" + 
        " width='100%' height='" + "90%" + "'>" +
        " style='height: 100%'"+
        "Object " + url + " failed" +
        "</object>");
      }
}

}

type DisplayMode = "img" | "pdf"