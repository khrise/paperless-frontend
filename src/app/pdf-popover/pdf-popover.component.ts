import { Component, OnInit, Input, Sanitizer, ViewChild, OnChanges, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Document } from '../document';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  @ViewChild("container") container: ElementRef;

  baseUrl: string

  pdfObject: SafeHtml

  constructor(private env: EnvironmentService,
    private _sanitizer: DomSanitizer) {
      this.baseUrl = env.getBaseUrl();
    }

  ngOnInit() {
    //this.pdfObject = "<object [attr.data]='baseUrl + doc.download_url' "+
    this.initFromDoc();
  }

  ngOnChanges() {
    //this.container.nativeElement
    //this.container.nativeElement.childNodes.length = 0
    this.initFromDoc();
  }

  public initFromDoc() {
    let url = this.env.getBaseUrl() + this.doc.download_url
    this.pdfObject = this._sanitizer.bypassSecurityTrustHtml(
        "<object data='" + url + "'" +// "#view=FitH' " + 
        " type='application/pdf' class='embed-responsive-item'" + 
        " width='100%' height='85%'>" +
        " style='height: 400px;'"+
        "Object " + url + " failed" +
        "</object>");
}

}
