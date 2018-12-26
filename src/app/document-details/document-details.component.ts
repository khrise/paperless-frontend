import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { Document } from '../document';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  @Input()
  doc: Document;

  baseUrl: string

  constructor(private env: EnvironmentService,
    activatedRoute: ActivatedRoute,
    private documentService: DocumentService) {
    this.baseUrl = this.env.getBaseUrl();
    activatedRoute.params.subscribe(param => {
      let theId = param.id;
      this.documentService.getDocument(theId).subscribe(result => {
        this.doc = result;
      })
    })

  }
  ngOnInit() {

  }

}