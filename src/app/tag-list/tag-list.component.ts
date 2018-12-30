import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from '../environment.service';
import { EventBusService } from '../event-bus.service';
import { Tag } from '../tag';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent extends ListComponent<Tag> implements OnInit, OnDestroy {

  displayedColumns = ["name", "slug", "match", "matching_algorithm"];
  

  tags;
  filter;
  sort;

  loading: boolean;
  sub: Subscription;

  filterSub: Subscription;

  constructor(service: DocumentService,
    modalService: NgbModal,
    dialog: MatDialog,
    env: EnvironmentService, 
    eventBus: EventBusService,
    breakpointObserver: BreakpointObserver,
    router: Router) {
      super(service, modalService, dialog, env, eventBus, "tags", breakpointObserver, router);
      this.baseUrl = env.getBaseUrl();
    }

  ngOnInit() {
    this.filterSub = this.eventBus.on("FILTER").subscribe(filterEvent => {
      this.filter = filterEvent['filter'];
      this.fetch();
    })
    this.fetch();
  }

  ngOnDestroy() {
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }
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
