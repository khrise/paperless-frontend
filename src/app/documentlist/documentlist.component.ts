import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';


@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.scss']
})
export class DocumentlistComponent implements OnInit {

  list: any[]

  baseUrl = "http://192.168.1.31:8000"

  constructor(private service: DocumentService) { }

  ngOnInit() {
    this.service.getDocuments().subscribe(
      result => {
        this.list = result;
      }
    )
  }

}
