import { Component, OnInit, Input, Inject, ChangeDetectorRef, ViewRef, ViewChild, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Document } from '../document'; 

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {

  @Input() doc: Document

  @Input() index: number
 
  constructor(//public activeModal: NgbActiveModal,
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cd: ChangeDetectorRef) {
      
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
