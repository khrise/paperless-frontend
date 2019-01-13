import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { DocumentFilter, MatchableFilter } from '../filter/filter';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  docPage$
  tagPage$

  constructor(private service: DocumentService) { }

  ngOnInit() {
    this.docPage$ = this.service.getPage("documents",
      new DocumentFilter(),
      { active: 'added', direction: "desc" }, 0, 5)

    this.tagPage$ = this.service.getPage("tags",
      new MatchableFilter(),
      null, 0, 1)

  }



}
