import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { EventBusService } from '../event-bus.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent extends ListComponent<Tag> implements OnInit {

  displayedColumns = ["name", "slug", "match", "matching_algorithm"];
  

  tags;
  filter;
  sort;

  loading: boolean;
  sub: Subscription;

  constructor(service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService) {
      super(service, modalService, dialog, env, eventBus, "tags");
      this.baseUrl = env.getBaseUrl();
      this.eventBus.on("FILTER").subscribe(filterEvent => {
        this.filter = filterEvent['filter'];
        this.fetch();
      })
    }

  ngOnInit() {
    this.fetch();
  }

  fetchTags = () => {
    this.loading = true;
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.service.getDocuments(this.filter, this.sort).subscribe(
      result => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(result);
        this.tags = result;
      }
    )
  }
 
}
