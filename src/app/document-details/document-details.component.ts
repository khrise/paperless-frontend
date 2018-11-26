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

  baseUrl: string

  @Input() doc: Document

  @Input() index: number

  constructor(//public activeModal: NgbActiveModal,
    public dialogRef: MatDialogRef<DocumentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private env: EnvironmentService,
    private cd: ChangeDetectorRef) {
      this.baseUrl = this.env.getBaseUrl();
    }

  ngOnInit() {
    //this.doc = this.data.doc;
    this.index = this.data.index;
    if (this.index === -1 ) {
      this.index = 0;
    }
    this.initFromIndex();
    this.dialogRef.afterClosed().subscribe(
      result => {

    })
  }

  initFromIndex = () => {
    this.doc = this.data.documents[this.index];
  } 

  onNoClick() {
    this.dialogRef.close();
  }

  navLeft() {
    this.index--;
    this.initFromIndex();
    this.cd.detectChanges();
  }

  navRight() {
    this.index++;
    this.initFromIndex();
    this.cd.detectChanges();
  }

}

export interface DialogData {
  documents: Document[];
  doc: Document,
  index: number;
}
