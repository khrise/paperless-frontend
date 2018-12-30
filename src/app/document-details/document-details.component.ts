import { Component, OnInit, Input } from '@angular/core';
import { EnvironmentService } from '../environment.service';
import { Document } from '../document';
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

  baseUrl: string;

  standalone: boolean;

  constructor(private env: EnvironmentService,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService) {
    this.baseUrl = this.env.getBaseUrl();
    
  }
  ngOnInit() {
    if (!this.doc) {
      this.activatedRoute.params.subscribe(param => {
        let theId = param.id;
        this.standalone = true;
        this.documentService.getDocument(theId).subscribe(result => {
          this.doc = result;
        })
      })

    }

  }
}