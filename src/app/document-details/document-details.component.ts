import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { Document } from '../document';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  @Input()
  doc: Document;

  baseUrl: string

  constructor(private env: EnvironmentService) {
    this.baseUrl = this.env.getBaseUrl();

  }
  ngOnInit() {

  }

}