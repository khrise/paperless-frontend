import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfPopoverComponent } from '../pdf-popover/pdf-popover.component';
import { EnvironmentService } from '../environment.service';
import { DocumentDetailsComponent } from '../document-details/document-details.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.scss']
})
export class DocumentlistComponent implements OnInit {

  list: any[]

  baseUrl: string;

  

  constructor(private service: DocumentService,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private env: EnvironmentService) {
      this.baseUrl = env.getBaseUrl();
    }

  ngOnInit() {
    this.fetchDocuments();
  }

  fetchDocuments = (filter?) => {
    
    this.service.getDocuments(filter).subscribe(
      result => {
        this.list = result;
      }
    )
  }

  open = (doc: Document) => {
    /*onst modalRef = this.modalService.open(DocumentDetailsComponent, 
      {backdrop: true, size: 'lg'});
    modalRef.componentInstance.doc = doc;*/
    this.dialog.open(DocumentDetailsComponent, {
      width: '90%',
      height: '90%',
      hasBackdrop: true,
      
      data: { doc: doc, index: this.list.indexOf(doc), documents: this.list}});
    
  }

  filterChanged = (filter) => {
    this.fetchDocuments(filter);

  }


}
